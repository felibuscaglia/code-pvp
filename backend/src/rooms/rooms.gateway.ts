import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { ChallengesService } from '../challenges/challenges.service';
import { SubmissionsService } from '../submissions/submissions.service';
import { RoomStatus } from './enums';
import { HttpStatus, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { type JoinRoomPayload, type RoundState } from './interfaces';
import { type ScoreBreakdown } from '../submissions/interfaces';
import { type CreateSubmissionDto } from '../submissions/dto/create-submission.dto';

@WebSocketGateway({ cors: { origin: process.env.FE_URL } })
export class RoomsGateway implements OnGatewayDisconnect {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly challengesService: ChallengesService,
    private readonly submissionsService: SubmissionsService,
  ) {}

  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RoomsGateway.name);

  async handleDisconnect(client: Socket) {
    const roomId = this.roomsService.findRoomByPlayerId(client.id);
    if (!roomId) return;

    const room = this.roomsService.findById(roomId);
    this.roomsService.removePlayer(roomId, client.id);
    this.server.to(roomId).emit('player-left', client.id);

    if (!room) return;

    this.logger.log(
      `Player disconnected ${client.id} room=${roomId} remaining=${room.players.size} status=${room.status}`,
    );

    if (room.players.size === 0) {
      clearTimeout(room.nextRoundTimeout);
      this.roomsService.delete(roomId);
      return;
    }

    if (room.status !== RoomStatus.IN_PROGRESS) return;

    const roundState = room.rounds[room.currentRound - 1];
    if (!roundState || roundState.ended) return;

    const alreadySubmitted = roundState.submittedPlayerIds.includes(client.id);
    if (alreadySubmitted) return;

    if (roundState.submittedPlayerIds.length === room.players.size) {
      await this.emitRoundEnded(roomId, roundState);
    }
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const { roomId, displayName, avatar, hostToken } = payload;

    const existingRoom = this.roomsService.findById(roomId);
    if (
      existingRoom?.maxPlayers &&
      existingRoom.players.size >= existingRoom.maxPlayers
    ) {
      throw new WsException('Room is full');
    }

    if (existingRoom && existingRoom.status !== RoomStatus.WAITING) {
      throw new WsException('Game has already started');
    }

    const player = this.roomsService.addPlayer(
      roomId,
      displayName,
      avatar,
      client.id,
      hostToken,
    );

    this.logger.log(
      `Player joined ${client.id} room=${roomId} displayName=${displayName} count=${existingRoom?.players.size ?? '?'}/${existingRoom?.maxPlayers ?? '-'}`,
    );

    client.join(roomId);

    client.to(roomId).emit('player-joined', player);

    const room = this.roomsService.findById(roomId);

    if (room?.maxPlayers && room?.players.size >= room.maxPlayers) {
      this.handleStartGame({ roomId });
    }

    return {
      event: 'room-joined',
      data: {
        roomId,
        player,
        players: room ? [...room.players.values()] : [player],
      },
    };
  }

  @SubscribeMessage('start-game')
  async handleStartGame(
    @MessageBody() payload: { roomId: string },
  ) {
    const { roomId } = payload;
    const room = this.roomsService.findById(roomId);
    if (!room) return;

    if (room.players.size < 1) return;

    const challengeId = room.challenges[room.currentRound - 1];
    const challenge = await this.challengesService.getChallengeForRound(challengeId);
    if (!challenge) {
      this.logger.error(
        `Cannot start round room=${roomId} round=${room.currentRound} challengeId=${challengeId} reason=challenge-missing`,
      );
      return;
    }

    this.logger.log(
      `Starting round room=${roomId} round=${room.currentRound}/${room.roundCount} players=${room.players.size} challengeId=${challengeId}`,
    );

    this.roomsService.updateStatus(roomId, RoomStatus.IN_PROGRESS);
    this.roomsService.startRound(roomId);

    const roundState = room.rounds[room.currentRound - 1];
    roundState.timeout = setTimeout(() => {
      this.emitRoundEnded(roomId, roundState);
    }, room.roundTime * 60_000);

    this.server.to(roomId).emit('start-round', {
      round: room.currentRound,
      challenge,
    });
  }

  @SubscribeMessage('send-message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { roomId: string; playerName: string; message: string },
  ) {
    client.to(payload.roomId).emit('new-message', {
      playerName: payload.playerName,
      message: payload.message,
      timestamp: Date.now(),
    });

    return HttpStatus.ACCEPTED;
  }

  @SubscribeMessage('submit-solution')
  async handleSubmitSolution(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateSubmissionDto,
  ) {
    const room = this.roomsService.findById(payload.roomId);
    if (!room) return;

    const roundState = room.rounds[room.currentRound - 1];
    if (!roundState || roundState.ended) return;
    if (roundState.submittedPlayerIds.includes(client.id)) return;
    roundState.submittedPlayerIds.push(client.id);

    const allSubmitted =
      roundState.submittedPlayerIds.length === room.players.size;

    this.logger.log(
      `Submission received room=${payload.roomId} round=${room.currentRound} player=${client.id} progress=${roundState.submittedPlayerIds.length}/${room.players.size} language=${payload.language}`,
    );

    this.server
      .to(payload.roomId)
      .emit('player-submitted', { playerId: client.id });

    const scorePromise = this.submissionsService
      .submit(payload, 'submit')
      .then((result) => {
        const score = this.submissionsService.calculateScore({
          result,
          code: payload.code,
          roundStartedAt: roundState.startedAt,
          submittedAt: Date.now(),
          roundTime: room.roundTime,
        });
        return { result, score };
      })
      .catch((err) => {
        this.logger.error(
          `submit failed for ${client.id} in room ${payload.roomId}`,
          err,
        );
        const score: ScoreBreakdown = {
          passRate: 0,
          timeScore: 0,
          memoryScore: 0,
          speedScore: 0,
          lengthScore: 0,
          total: 0,
          error: true,
        };
        return { score };
      });

    roundState.scores.set(
      client.id,
      scorePromise.then(({ score }) => score),
    );

    if (allSubmitted) {
      this.emitRoundEnded(payload.roomId, roundState);
    }

    return HttpStatus.OK;
  }

  private async emitRoundEnded(roomId: string, roundState: RoundState) {
    if (roundState.ended) return;
    roundState.ended = true;

    const room = this.roomsService.findById(roomId);
    if (!room) return;

    const reason =
      roundState.submittedPlayerIds.length === room.players.size
        ? 'all-submitted'
        : 'timeout';
    this.logger.log(
      `Round ended room=${roomId} round=${room.currentRound} reason=${reason} submitted=${roundState.submittedPlayerIds.length}/${room.players.size}`,
    );

    clearTimeout(roundState.timeout);
    roundState.timeout = undefined;

    const playerIds = [...roundState.scores.keys()];
    const resolvedScores = await Promise.all(roundState.scores.values());
    playerIds.forEach((id, i) => {
      roundState.resolvedScores.set(id, resolvedScores[i]);
    });

    if (roundState.resolvedScores.size === 0) {
      const zero: ScoreBreakdown = {
        passRate: 0,
        timeScore: 0,
        memoryScore: 0,
        speedScore: 0,
        lengthScore: 0,
        total: 0,
      };
      for (const playerId of room.players.keys()) {
        roundState.resolvedScores.set(playerId, zero);
      }
    }

    const scores = Object.fromEntries(roundState.resolvedScores);
    const scoredPlayerIds = [...roundState.resolvedScores.keys()];
    const winner =
      scoredPlayerIds.length &&
      scoredPlayerIds.some((id) => scores[id].total > 0)
        ? scoredPlayerIds.reduce((a, b) =>
            scores[a].total >= scores[b].total ? a : b,
          )
        : null;

    // Atomic block: advance state and schedule next round BEFORE emitting,
    // so no observer ever sees "round ended" while currentRound still points
    // at the finished round.
    room.currentRound++;
    const isGameOver = room.currentRound > room.roundCount;
    if (!isGameOver) {
      room.nextRoundTimeout = setTimeout(() => {
        this.handleStartGame({ roomId });
      }, 60_000);
    }

    this.logger.log(
      `Round result room=${roomId} round=${room.currentRound - 1} winner=${winner ?? 'none'} gameOver=${isGameOver}`,
    );

    this.server.to(roomId).emit('end-round', { scores, winner });

    if (isGameOver) {
      this.emitGameEnded(roomId);
    }
  }

  private emitGameEnded(roomId: string) {
    const room = this.roomsService.findById(roomId);
    if (!room) return;

    const totals = new Map<string, number>();
    for (const round of room.rounds) {
      for (const [playerId, score] of round.resolvedScores) {
        totals.set(playerId, (totals.get(playerId) ?? 0) + score.total);
      }
    }

    const standings = [...totals.entries()]
      .map(([playerId, total]) => ({ playerId, total }))
      .sort((a, b) => b.total - a.total);

    const winner = standings.some((s) => s.total > 0)
      ? standings[0].playerId
      : null;

    this.roomsService.updateStatus(roomId, RoomStatus.FINISHED);
    this.logger.log(
      `Game ended room=${roomId} winner=${winner ?? 'none'} players=${standings.length}`,
    );
    this.server.to(roomId).emit('end-game', { standings, winner });
  }
}

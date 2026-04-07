import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateRoomDto } from './dto/create-room.dto';
import { Player } from './interfaces/player.interface';
import { Room } from './interfaces/room.interface';
import { RoomStatus } from './enums';
import { ChallengesService } from '../challenges/challenges.service';

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<string, Room>();
  private readonly playerRoomBySocketId = new Map<string, string>();

  constructor(private readonly challengesService: ChallengesService) {}

  async create(dto: CreateRoomDto): Promise<{ roomId: string; hostToken: string }> {
    const roomId = randomUUID();
    const hostToken = randomUUID();
    const challenges = await this.challengesService.getChallengesByDifficulty(
      dto.difficulty,
      dto.roundCount,
    );
    this.rooms.set(roomId, {
      ...dto,
      players: new Map(),
      status: RoomStatus.WAITING,
      hostToken,
      challenges,
      currentRound: 1,
      rounds: [],
    });
    return { roomId, hostToken };
  }

  findById(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  addPlayer(
    roomId: string,
    displayName: string,
    avatar: string,
    socketId: string,
    hostToken?: string,
  ): Player | undefined {
    const room = this.rooms.get(roomId);
    if (!room) return undefined;

    const player: Player = {
      id: socketId,
      displayName,
      avatar,
      isHost: hostToken === room.hostToken,
    };

    room.players.set(player.id, player);
    this.playerRoomBySocketId.set(socketId, roomId);
    return player;
  }

  removePlayer(roomId: string, playerId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;
    this.playerRoomBySocketId.delete(playerId);
    return room.players.delete(playerId);
  }

  delete(roomId: string): void {
    this.rooms.delete(roomId);
  }

  updateStatus(roomId: string, status: RoomStatus): void {
    const room = this.rooms.get(roomId);
    if (!room) return;
    room.status = status;
  }

  startRound(
    roomId: string,
  ): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.rounds.push({
      startedAt: Date.now(),
      submittedPlayerIds: [],
      scores: new Map(),
      resolvedScores: new Map(),
    });
  }

  findRoomByPlayerId(playerId: string): string | undefined {
    return this.playerRoomBySocketId.get(playerId);
  }
}

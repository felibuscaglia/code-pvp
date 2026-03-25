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

interface JoinRoomPayload {
  roomId: string;
  displayName: string;
  avatar: string;
  hostToken?: string;
}

@WebSocketGateway({ cors: { origin: process.env.FE_URL } })
export class RoomsGateway implements OnGatewayDisconnect {
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    const roomId = this.roomsService.findRoomByPlayerId(client.id);
    if (!roomId) return;

    this.roomsService.removePlayer(roomId, client.id);
    this.server.to(roomId).emit('player-left', client.id);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const { roomId, displayName, avatar, hostToken } = payload;

    const player = this.roomsService.addPlayer(roomId, displayName, avatar, client.id, hostToken);

    client.join(roomId);

    
    client.to(roomId).emit('player-joined', player);

    const room = this.roomsService.findById(roomId);
    if (room && room.maxPlayers && room.players.size >= room.maxPlayers) {
      this.server.to(roomId).emit('start');
    }

    return { event: 'room-joined', data: { roomId, player } };
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
  }
}

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

interface JoinRoomPayload {
  roomId: string;
  displayName: string;
  avatar: string;
}

@WebSocketGateway({ cors: { origin: process.env.FE_URL } })
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const { roomId, displayName, avatar } = payload;

    const player = this.roomsService.addPlayer(roomId, displayName, avatar);

    client.join(roomId);

    
    client.to(roomId).emit('player-joined', player);

    return { event: 'room-joined', data: { roomId, player } };
  }
}

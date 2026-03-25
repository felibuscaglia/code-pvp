import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateRoomDto } from './dto/create-room.dto';
import { Player } from './interfaces/player.interface';
import { Room } from './interfaces/room.interface';
import { RoomStatus } from './enums';

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<string, Room>();
  private readonly playerRoomBySocketId = new Map<string, string>();

  create(dto: CreateRoomDto): { roomId: string; hostToken: string } {
    const roomId = randomUUID();
    const hostToken = randomUUID();
    this.rooms.set(roomId, {
      ...dto,
      players: new Map(),
      status: RoomStatus.WAITING,
      hostToken,
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

  findRoomByPlayerId(playerId: string): string | undefined {
    return this.playerRoomBySocketId.get(playerId);
  }
}

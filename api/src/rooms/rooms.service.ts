import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateRoomDto } from './dto/create-room.dto';
import { Player } from './interfaces/player.interface';
import { Room } from './interfaces/room.interface';
import { RoomStatus } from './enums';

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<string, Room>();

  create(dto: CreateRoomDto): string {
    const roomId = randomUUID();
    this.rooms.set(roomId, {
      ...dto,
      players: new Map(),
      status: RoomStatus.WAITING,
    });
    return roomId;
  }

  findById(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  addPlayer(
    roomId: string,
    displayName: string,
    avatar: string,
  ): Player | undefined {
    const room = this.rooms.get(roomId);
    if (!room) return undefined;

    const player: Player = {
      id: randomUUID(),
      displayName,
      avatar,
    };

    room.players.set(player.id, player);
    return player;
  }
}

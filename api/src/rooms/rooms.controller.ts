import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() dto: CreateRoomDto) {
    const roomId = this.roomsService.create(dto);
    return { roomId };
  }

  @Get(':roomId')
  getById(@Param('roomId') roomId: string) {
    const room = this.roomsService.findById(roomId);

    if (!room) throw new NotFoundException('Room not found.');

    return { ...room, players: Object.fromEntries(room.players) };
  }
}

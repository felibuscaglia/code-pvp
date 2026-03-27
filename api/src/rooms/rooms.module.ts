import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { RoomsController } from './rooms.controller';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [ChallengesModule],
  providers: [RoomsService, RoomsGateway],
  controllers: [RoomsController]
})
export class RoomsModule {}

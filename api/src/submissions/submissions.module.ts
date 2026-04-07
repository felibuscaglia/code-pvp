import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { Judge0Module } from '../judge0/judge0.module';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [
    Judge0Module,
    ChallengesModule,
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 2_000, limit: 1 },
      { name: 'long', ttl: 60_000, limit: 20 },
    ]),
  ],
  providers: [SubmissionsService],
  controllers: [SubmissionsController],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}

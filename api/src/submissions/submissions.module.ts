import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { Judge0Module } from '../judge0/judge0.module';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [Judge0Module, ChallengesModule],
  providers: [SubmissionsService],
  controllers: [SubmissionsController],
})
export class SubmissionsModule {}

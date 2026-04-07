import { Controller, Post, Body, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('submissions')
@UseGuards(ThrottlerGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @Throttle({
    short: { ttl: 2_000, limit: 1 },
    long: { ttl: 60_000, limit: 20 },
  })
  create(
    @Query('mode') mode: 'test' | 'submit',
    @Body() dto: CreateSubmissionDto,
  ) {
    return this.submissionsService.submit(dto, mode);
  }
}

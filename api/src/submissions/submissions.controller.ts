import { Controller, Post, Body, Query } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  create(
    @Query('mode') mode: 'test' | 'submit',
    @Body() dto: CreateSubmissionDto,
  ) {
    console.log({ mode, dto });
    return this.submissionsService.submit(dto, mode);
  }
}

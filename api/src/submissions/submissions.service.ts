import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ChallengesService } from '../challenges/challenges.service';
import { Judge0Service } from '../judge0/judge0.service';
import { SubmissionResult, TestCases } from './interfaces';
import {
  buildJavascriptHarness,
  buildPythonHarness,
  extractFunctionName,
} from './helpers';

const HARNESS_BUILDERS: Record<string, typeof buildJavascriptHarness> = {
  javascript: buildJavascriptHarness,
  python: buildPythonHarness,
};

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly judge0Service: Judge0Service,
  ) {}

  async submit(
    dto: CreateSubmissionDto,
    mode: 'test' | 'submit',
  ): Promise<SubmissionResult> {
    const challenge = await this.challengesService.getChallengeForRound(
      dto.challengeId,
    );

    if (!challenge) throw new InternalServerErrorException("Challenge not found");

    const testCases = challenge.test_cases as any as TestCases;

    const cases =
      mode === 'test'
        ? testCases.public
        : [...testCases.public, ...testCases.hidden];

    const starterCode = challenge.starter_code;
    const fnName = extractFunctionName(starterCode as Record<string, string>, dto.language);
    const buildHarness = HARNESS_BUILDERS[dto.language];
    const sourceCode = buildHarness(dto.code, fnName, cases);

    const judge0Response = await this.judge0Service.createSubmission(
      sourceCode,
      dto.language,
    );

    if (judge0Response.stderr || judge0Response.compile_output) {
      return {
        testCases: cases.map((_, i) => ({
          case: i,
          passed: false,
          result: null,
          expected: cases[i].expected,
          error:
            judge0Response.stderr ??
            judge0Response.compile_output ??
            'Unknown error',
          logs: [],
        })),
      };
    }

    const parsed = JSON.parse(judge0Response.stdout ?? '{}');

    return {
      testCases: parsed.results ?? [],
    };
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ChallengesService } from '../challenges/challenges.service';
import { Judge0Service } from '../judge0/judge0.service';
import { ScoreBreakdown, ScoreParams, SubmissionResult, TestCases } from './interfaces';
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

    const totalExecutionTime = parseFloat(judge0Response.time) || 0;
    const totalMemoryUsage = judge0Response.memory || 0;

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
        totalExecutionTime,
        totalMemoryUsage,
      };
    }

    const parsed = JSON.parse(judge0Response.stdout ?? '{}');

    return {
      testCases: parsed.results ?? [],
      totalExecutionTime,
      totalMemoryUsage,
    };
  }

  calculateScore(params: ScoreParams): ScoreBreakdown {
    const { result, code, roundStartedAt, submittedAt, roundTime } = params;
    const totalCases = result.testCases.length;

    if (totalCases === 0) {
      return { passRate: 0, timeScore: 0, memoryScore: 0, speedScore: 0, lengthScore: 0, total: 0 };
    }

    // 1. Test cases passed (40%)
    const passed = result.testCases.filter((tc) => tc.passed).length;
    const passRate = passed / totalCases;

    // 2. Execution time (25%) — lower is better, capped at Judge0's 5s limit
    const maxTime = 5;
    const timeScore = Math.max(0, 1 - result.totalExecutionTime / maxTime);

    // 3. Memory usage (15%) — lower is better, capped at Judge0's 128MB limit
    const maxMemory = 128000;
    const memoryScore = Math.max(0, 1 - result.totalMemoryUsage / maxMemory);

    // 4. Submission speed (12%) — faster submission within the round earns more
    const roundDuration = roundTime * 60_000;
    const elapsed = submittedAt - roundStartedAt;
    const speedScore = Math.max(0, 1 - elapsed / roundDuration);

    // 5. Code length (8%) — fewer chars after stripping whitespace/comments
    const stripped = code.replace(/\/\/.*|\/\*[\s\S]*?\*\/|#.*/g, '').replace(/\s+/g, '');
    const maxLength = 2000;
    const lengthScore = Math.max(0, 1 - stripped.length / maxLength);

    const total = Math.max(
      0,
      Math.min(
        1,
        passRate * 0.4 +
          timeScore * 0.25 +
          memoryScore * 0.15 +
          speedScore * 0.12 +
          lengthScore * 0.08,
      ),
    );

    return { passRate, timeScore, memoryScore, speedScore, lengthScore, total };
  }
}

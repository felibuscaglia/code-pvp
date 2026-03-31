import { TestCaseResult } from './test-case-result.interface';

export interface SubmissionResult {
  testCases: TestCaseResult[];
  logs: string[];
}

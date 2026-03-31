export interface TestCaseResult {
  case: number;
  passed: boolean;
  result?: unknown;
  expected: any;
  error?: string;
}

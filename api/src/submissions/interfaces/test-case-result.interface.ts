export interface TestCaseResult {
  case: number;
  passed: boolean;
  result: any;
  expected: any;
  error?: string;
  logs: string[];
}

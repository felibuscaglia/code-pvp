interface TestCaseInput {
  nums: any[];
  target: any;
}

export interface TestCase {
  input: TestCaseInput;
  expected: any[];
}

export interface TestCases {
  hidden: TestCase[];
  public: TestCase[];
}

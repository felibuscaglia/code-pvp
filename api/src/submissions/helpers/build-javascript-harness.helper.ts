import { TestCase } from '../interfaces';

export function buildJavascriptHarness(
  userCode: string,
  fnName: string,
  testCases: TestCase[],
): string {
  return `
${userCode}

const __cases = ${JSON.stringify(testCases)};
const __logs = [];
const __origLog = console.log;
console.log = (...args) => __logs.push(args.map(String).join(' '));

const __results = __cases.map((tc, i) => {
  try {
    const result = ${fnName}(...Object.values(tc.input));
    const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
    return { case: i, passed, result, expected: tc.expected };
  } catch (e) {
    return { case: i, passed: false, error: e.message, expected: tc.expected };
  }
});

__origLog(JSON.stringify({ results: __results, logs: __logs }));
`;
}

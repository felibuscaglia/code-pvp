import { TestCase } from '../interfaces';

export function buildJavascriptHarness(
  userCode: string,
  fnName: string,
  testCases: TestCase[],
): string {
  return `
${userCode}

const __cases = ${JSON.stringify(testCases)};
const __origLog = console.log;
let __caseLogs = [];
console.log = (...args) => __caseLogs.push(args.map(String).join(' '));

const __results = __cases.map((tc, i) => {
  __caseLogs = [];
  try {
    const result = ${fnName}(...Object.values(tc.input));
    const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
    return { case: i, passed, result, expected: tc.expected, logs: __caseLogs };
  } catch (e) {
    return { case: i, passed: false, result: null, error: e.message, expected: tc.expected, logs: __caseLogs };
  }
});

__origLog(JSON.stringify({ results: __results }));
`;
}

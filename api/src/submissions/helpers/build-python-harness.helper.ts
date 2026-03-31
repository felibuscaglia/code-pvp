import { TestCase } from '../interfaces';

export function buildPythonHarness(
  userCode: string,
  fnName: string,
  testCases: TestCase[],
): string {
  return `
import json, io, sys

${userCode}

__cases = json.loads('${JSON.stringify(testCases).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}')
__logs = []
__orig_print = print

def print(*args, **kwargs):
    buf = io.StringIO()
    __orig_print(*args, file=buf, **kwargs)
    __logs.append(buf.getvalue().rstrip())

__results = []
for i, tc in enumerate(__cases):
    try:
        result = ${fnName}(**tc["input"])
        passed = json.dumps(result, sort_keys=True) == json.dumps(tc["expected"], sort_keys=True)
        __results.append({"case": i, "passed": passed, "result": result, "expected": tc["expected"]})
    except Exception as e:
        __results.append({"case": i, "passed": False, "error": str(e), "expected": tc["expected"]})

__orig_print(json.dumps({"results": __results, "logs": __logs}))
`;
}

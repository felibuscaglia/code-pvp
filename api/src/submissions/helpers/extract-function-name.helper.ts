const PATTERNS: Record<string, RegExp> = {
  javascript: /function\s+(\w+)/,
  python: /def\s+(\w+)/,
};

export function extractFunctionName(
  starterCode: Record<string, string>,
  language: string,
): string {
  const code = starterCode[language] ?? '';
  const match = code.match(PATTERNS[language]);

  if (!match) {
    throw new Error(`Could not extract function name from ${language} starter code`);
  }

  return match[1];
}

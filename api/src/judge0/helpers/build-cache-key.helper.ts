import { createHash } from 'crypto';

export function buildCacheKey(language: string, sourceCode: string): string {
  return createHash('sha256')
    .update(`${language}:${sourceCode}`)
    .digest('hex');
}

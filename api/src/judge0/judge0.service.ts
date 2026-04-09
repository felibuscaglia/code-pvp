import { Injectable, Logger } from '@nestjs/common';
import { LRUCache } from 'lru-cache';
import { Judge0Response } from './interfaces';
import {
  LANGUAGE_IDS,
  SUBMISSION_CACHE_MAX,
  SUBMISSION_CACHE_TTL_MS,
} from './constants';
import { buildCacheKey } from './helpers';
import { Judge0Client } from './judge0.client';

@Injectable()
export class Judge0Service {
  private readonly logger = new Logger(Judge0Service.name);

  private readonly cache = new LRUCache<string, Judge0Response>({
    max: SUBMISSION_CACHE_MAX,
    ttl: SUBMISSION_CACHE_TTL_MS,
  });

  constructor(private readonly judge0Client: Judge0Client) {}

  async createSubmission(
    sourceCode: string,
    language: string,
  ): Promise<Judge0Response> {
    const cacheKey = buildCacheKey(language, sourceCode);
    const cached = this.cache.get(cacheKey);
    if (cached) {
      this.logger.log(`Judge0 cache hit (${cacheKey.slice(0, 12)})`);
      return cached;
    }

    const result = await this.judge0Client.createSubmission({
      source_code: sourceCode,
      language_id: LANGUAGE_IDS[language],
      cpu_time_limit: 5,
      memory_limit: 128000,
    });

    this.cache.set(cacheKey, result);
    return result;
  }
}

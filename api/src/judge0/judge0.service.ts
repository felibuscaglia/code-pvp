import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LRUCache } from 'lru-cache';
import { Judge0Response } from './interfaces';
import {
  LANGUAGE_IDS,
  SUBMISSION_CACHE_MAX,
  SUBMISSION_CACHE_TTL_MS,
} from './constants';
import { buildCacheKey } from './helpers';

@Injectable()
export class Judge0Service {
  private readonly JUDGE0_HOST = 'judge0-ce.p.rapidapi.com';
  private readonly JUDGE0_API_URL = `https://${this.JUDGE0_HOST}`;
  private readonly apiKey: string;
  private readonly logger = new Logger(Judge0Service.name);

  private readonly cache = new LRUCache<string, Judge0Response>({
    max: SUBMISSION_CACHE_MAX,
    ttl: SUBMISSION_CACHE_TTL_MS,
  });

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow<string>('RAPIDAPI_KEY');
  }

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

    const languageId = LANGUAGE_IDS[language];

    const response = await fetch(
      `${this.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.JUDGE0_HOST,
        },
        body: JSON.stringify({
          source_code: sourceCode,
          language_id: languageId,
          cpu_time_limit: 5,
          memory_limit: 128000,
        }),
      },
    );

    const result = (await response.json()) as Judge0Response;
    this.cache.set(cacheKey, result);
    return result;
  }
}

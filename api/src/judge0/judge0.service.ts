import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Judge0Response } from './interfaces';
import { LANGUAGE_IDS } from './constants';

@Injectable()
export class Judge0Service {
  private readonly JUDGE0_HOST = 'judge0-ce.p.rapidapi.com';
  private readonly JUDGE0_API_URL = `https://${this.JUDGE0_HOST}`;
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow<string>('RAPIDAPI_KEY');
  }

  async createSubmission(
    sourceCode: string,
    language: string,
  ): Promise<Judge0Response> {
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

    return response.json();
  }
}

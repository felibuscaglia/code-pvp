import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/database.types';
import { Functions } from './types';

@Injectable()
export class SupabaseService {
  public readonly client: SupabaseClient<Database>;

  constructor(private readonly configService: ConfigService) {
    this.client = createClient<Database>(
      this.configService.getOrThrow<string>('SUPABASE_URL'),
      this.configService.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY'),
    );
  }

  async rpc<FnName extends keyof Functions>(
    fn: FnName,
    args: Functions[FnName]['Args'],
  ): Promise<Functions[FnName]['Returns']> {
    const { data, error } = await this.client.rpc(fn as string, args as any);

    if (error) {
      throw error;
    }

    return data as Functions[FnName]['Returns'];
  }
}

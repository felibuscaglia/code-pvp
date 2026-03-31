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

  async findOne<TableName extends keyof Database['public']['Tables']>(
    table: TableName,
    filters: Partial<Database['public']['Tables'][TableName]['Row']>,
    select: string = '*',
  ): Promise<Database['public']['Tables'][TableName]['Row'] | null> {
    let query = this.client.from(table).select(select as any);

    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key as any, value);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      throw error;
    }

    return data as Database['public']['Tables'][TableName]['Row'] | null;
  }

  async rpc<FnName extends keyof Functions>(
    fn: FnName,
    args: Functions[FnName]['Args'],
  ) {
    const { data, error } = await this.client.rpc(fn, args);

    if (error) {
      throw error;
    }

    return data;
  }
}

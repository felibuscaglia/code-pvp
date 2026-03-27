import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RoomsModule } from './rooms/rooms.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RoomsModule, SupabaseModule, ChallengesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

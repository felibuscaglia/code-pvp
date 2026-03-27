import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ChallengeDifficulty } from '../supabase/types';

@Injectable()
export class ChallengesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  getChallengesByDifficulty(difficulty: ChallengeDifficulty, amount: number) {
    return this.supabaseService.rpc('pick_random_challenges_by_difficulty', {
      p_difficulty: difficulty,
      p_amount: amount,
    });
  }
}

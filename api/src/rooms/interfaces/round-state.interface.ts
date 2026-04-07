import { ScoreBreakdown } from '../../submissions/interfaces';

export interface RoundState {
  startedAt: number;
  submittedPlayerIds: string[];
  scores: Map<string, Promise<ScoreBreakdown>>;
  resolvedScores: Map<string, ScoreBreakdown>;
  timeout?: ReturnType<typeof setTimeout>;
}

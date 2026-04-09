export interface ScoreBreakdown {
  passRate: number;
  timeScore: number;
  memoryScore: number;
  speedScore: number;
  lengthScore: number;
  total: number;
  error?: boolean;
}

export interface CreateRoomPayload {
  name: string
  roundCount: number
  roundTime: number
  difficulty: string
  languages: string[]
  maxPlayers?: number
  public: boolean
}

export type RoomStatus = "waiting" | "in_progress" | "finished"

export interface RoundState {
  startedAt: number
  submittedPlayerIds: string[]
}

export interface Room {
  id: string
  name: string
  roundCount: number
  roundTime: number
  difficulty: string
  languages: string[]
  maxPlayers: number
  public: boolean
  players: Map<string, Player>
  status: RoomStatus
  currentRound: number
  rounds: RoundState[]
}

export interface Player {
  id: string
  displayName: string
  avatar: string
  isHost: boolean
}

export interface Example {
  id: string
  challenge_id: string
  input: string
  output: string
  explanation: string | null
}

export interface TestCase {
  input: Record<string, unknown>
  expected: unknown
}

export interface TestCases {
  hidden: TestCase[]
  public: TestCase[]
}

export interface CreateSubmissionPayload {
  challengeId: string
  language: string
  code: string
  roomId: string
}

export interface TestCaseResult {
  case: number
  passed: boolean
  result: unknown
  expected: unknown
  error?: string
  logs: string[]
}

export interface SubmissionResult {
  testCases: TestCaseResult[]
}

export interface ScoreBreakdown {
  passRate: number
  timeScore: number
  memoryScore: number
  speedScore: number
  lengthScore: number
  total: number
}

export interface RoundResult {
  scores: Record<string, ScoreBreakdown>
  winner: string | null
}

export interface GameStanding {
  playerId: string
  total: number
}

export interface GameResult {
  standings: GameStanding[]
  winner: string | null
}

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  starter_code: Record<string, string>
  test_cases: TestCases
  constraints: string[] | null
  tags: string[] | null
  created_at: string
  examples: Example[]
}

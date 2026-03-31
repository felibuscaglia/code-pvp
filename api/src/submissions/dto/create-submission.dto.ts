import { IsString, IsIn } from 'class-validator';

const ALLOWED_LANGUAGES = ['javascript', 'python'];

export class CreateSubmissionDto {
  @IsString()
  challengeId: string;

  @IsString()
  @IsIn(ALLOWED_LANGUAGES)
  language: "javascript" | "python";

  @IsString()
  code: string;

  @IsString()
  roomId: string;
}

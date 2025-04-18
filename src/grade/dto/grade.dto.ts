import { IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateGradeDto {
  @IsString()
  value: string;

  @IsInt()
  weight: number;

  @IsISO8601({ strict: true })
  date: string;

  @IsInt()
  studentId: number;

  @IsInt()
  lessonId: number;

  @IsOptional()
  @IsString()
  theme: string;
}

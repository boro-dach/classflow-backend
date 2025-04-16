import { IsDate, IsInt, IsISO8601, IsString } from 'class-validator';

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
}

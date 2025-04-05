import { IsInt, IsString } from 'class-validator';

export class CreateJoinRequestDto {
  @IsInt()
  studentId: number;

  @IsString()
  classId: string;
}

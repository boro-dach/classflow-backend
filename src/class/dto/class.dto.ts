import { IsInt, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsInt()
  teacherId: number;

  @IsInt()
  schoolId: number;
}

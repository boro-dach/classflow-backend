import { IsInt, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsInt()
  teacherId: number;

  @IsInt()
  scoolId: number;
}

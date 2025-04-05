import { IsEmail, IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsInt()
  @Min(18)
  age: number;
}

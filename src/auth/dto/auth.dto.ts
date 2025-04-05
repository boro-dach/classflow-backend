import { IsEmail, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Name is not valid' })
  name: string;

  @IsString({ message: 'Surname is not valid' })
  surname: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'Password is not valid' })
  @MinLength(6, { message: 'Password has to be at least 6 characters long' })
  password: string;

  @IsNumber({}, { message: 'Age has to be a number' })
  age: number;
}

export class LoginDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'Password is not valid' })
  @MinLength(6, { message: 'Password has to be at least 6 characters long' })
  password: string;
}

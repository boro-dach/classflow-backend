import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export enum UserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
}

export class RegisterDto {
  @IsString({ message: 'Name is not valid' })
  name: string;

  @IsString({ message: 'Surname is not valid' })
  surname: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  login: string;

  @IsString({ message: 'Password is not valid' })
  @MinLength(6, { message: 'Password has to be at least 6 characters long' })
  password: string;

  @IsNumber({}, { message: 'Age has to be a number' })
  age: number;

  @IsOptional()
  @IsString({ message: 'Parent code is not valid' })
  parentCode?: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class LoginDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'Password is not valid' })
  @MinLength(6, { message: 'Password has to be at least 6 characters long' })
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  login: string;
}

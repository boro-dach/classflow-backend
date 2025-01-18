import { IsArray, IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class studentLoginDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {message: 'password has to be at least 6 charachters long'})
    password: string
}

export class studentRegisterDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {message: 'password has to be at least 6 charachters long'})
    password: string

    @IsString()
    name: string

    @IsString()
    surname: string
}

export class teacherLoginDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {message: 'password has to be at least 6 charachters long'})
    password: string
}

export class teacherRegisterDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {message: 'password has to be at least 6 charachters long'})
    password: string

    @IsString()
    name: string

    @IsString()
    surname: string
}

export class studentResponseDto {
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    @IsEmail()
    email: string

    // @IsNumber()
    // @IsOptional()
    // classId?: number;

    // @IsOptional()
    // class?: Class;

    // @IsArray()
    // @IsOptional()
    // grades?: Grade[];

    @IsString()
    @IsOptional()
    token?: string;
}

export class teacherResponseDto {
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    @IsEmail()
    email: string

    // @IsNumber()
    // @IsOptional()
    // classId?: number;

    // @IsOptional()
    // class?: Class;

    // @IsArray()
    // @IsOptional()
    // grades?: Grade[];

    @IsString()
    @IsOptional()
    token?: string;
}
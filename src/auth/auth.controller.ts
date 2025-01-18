import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { studentLoginDto, studentRegisterDto, studentResponseDto, teacherLoginDto, teacherRegisterDto, teacherResponseDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register-student')
  async registerStudent(
    @Body() dto: studentRegisterDto,
  ): Promise<studentResponseDto> {
    const {token, ...response} = 
      await this.authService.registerStudent(dto);

    return {...response, token}
  }

  @HttpCode(200)
  @Post('login-student')
  async loginStudent(
    @Body() dto: studentLoginDto,
  ): Promise<studentResponseDto> {
    const {token, ...response} = 
      await this.authService.loginStudent(dto);

    return {...response, token}
  }

  @HttpCode(200)
  @Post('register-teacher')
  async registerTeacher(
    @Body() dto: teacherRegisterDto,
  ): Promise<teacherResponseDto> {
    const {token, ...response} = 
      await this.authService.registerTeacher(dto);

    return {...response, token}
  }

  @HttpCode(200)
  @Post('login-teacher')
  async loginTeacher(
    @Body() dto: teacherLoginDto,
  ): Promise<teacherResponseDto> {
    const {token, ...response} = 
      await this.authService.loginTeacher(dto);

    return {...response, token}
  }
}
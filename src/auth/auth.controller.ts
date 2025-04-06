import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register-student')
  async registerStudent(@Body() dto: RegisterDto, parentId?: number) {
    const student = await this.authService.registerStudent(dto, parentId);

    return student;
  }

  @HttpCode(200)
  @Post('register-teacher')
  async registerTeacher(@Body() dto: RegisterDto) {
    const teacher = await this.authService.registerTeacher(dto);

    return teacher;
  }

  @HttpCode(200)
  @Post('register-parent')
  async registerParent(@Body() dto: RegisterDto) {
    const parent = await this.authService.registerParent(dto);

    return parent;
  }

  @HttpCode(200)
  @Post('login-student')
  async loginStudent(@Body() dto: LoginDto) {
    const student = await this.authService.loginStudent(dto);

    return student;
  }

  @HttpCode(200)
  @Post('login-teacher')
  async loginTeacher(@Body() dto: LoginDto) {
    const teacher = await this.authService.loginTeacher(dto);

    return teacher;
  }

  @HttpCode(200)
  @Post('login-parent')
  async loginParent(@Body() dto: LoginDto) {
    const parent = await this.authService.loginParent(dto);

    return parent;
  }
}

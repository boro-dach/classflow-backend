import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register-student')
  async register(@Body() dto: RegisterDto) {
    const student = await this.authService.registerStudent(dto);

    return student;
  }
}

import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async registerStudent(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    return user;
  }

  @HttpCode(200)
  @Post('login')
  async loginStudent(@Body() dto: LoginDto) {
    const user = await this.authService.login(dto);

    return user;
  }
}

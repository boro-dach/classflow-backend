import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto, UserRole } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

export interface TokenPayload {
  email: string;
  role: UserRole;
  login: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private user: UserService,
  ) {}

  //universal functions

  issueToken({ email, role, login }: TokenPayload) {
    const token = this.jwt.sign(
      { email, role, login },
      {
        expiresIn: '7d',
      },
    );

    return token;
  }

  //student functions

  async register(dto: RegisterDto) {
    const oldUser = await this.user.getByEmail(dto.email);

    if (oldUser) throw new BadRequestException('User already exists');

    const token = this.issueToken({
      email: dto.email,
      role: dto.role,
      login: dto.login,
    });

    switch (dto.role) {
      case 'STUDENT':
        if (dto.role === 'STUDENT' && dto.age < 18) {
          if (!dto.parentCode)
            throw new BadRequestException('Parent code is required');
          return await this.user.createMinor(dto, token);
        } else {
          return await this.user.createAdult(dto, token);
        }
      case 'PARENT':
        return await this.user.createParent(dto, token);
      case 'TEACHER':
        return await this.user.createTeacher(dto, token);
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validate(dto);

    const token = this.issueToken({
      email: dto.email,
      role: dto.role,
      login: dto.login,
    });

    return { user, token };
  }

  private async validate(dto: LoginDto) {
    const user = await this.user.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}

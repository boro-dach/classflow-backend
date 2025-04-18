import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async createMinor(dto: RegisterDto, token: string) {
    const parent = await this.prisma.user.findFirst({
      where: { parentCode: dto.parentCode, role: 'PARENT' },
    });

    if (!parent) {
      throw new BadRequestException('Parent code is not valid');
    }

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: await hash(dto.password),
        age: dto.age,
        accessToken: token,
        parentId: parent.id,
        role: dto.role,
        login: dto.login,
      },
    });

    return user;
  }

  async createAdult(dto: RegisterDto, token: string) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: await hash(dto.password),
        age: dto.age,
        accessToken: token,
        role: dto.role,
        login: dto.login,
      },
    });

    return user;
  }

  async generateParentCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let attempt = 0; attempt < 3; attempt++) {
      let code = '';

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }

      const exists = await this.prisma.user.findUnique({
        where: { parentCode: code, role: 'TEACHER' },
      });

      if (!exists) {
        return code;
      }
    }

    throw new Error(
      'Failed to generate parent code in 3 attempts, most likely there are too many collisions. Try again.',
    );
  }

  async createParent(dto: RegisterDto, token: string) {
    const code = await this.generateParentCode();

    return this.prisma.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: await hash(dto.password),
        parentCode: code,
        age: dto.age,
        accessToken: token,
        role: dto.role,
        login: dto.login,
      },
    });
  }

  async createTeacher(dto: RegisterDto, token: string) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: await hash(dto.password),
        age: dto.age,
        accessToken: token,
        role: dto.role,
        login: dto.login,
      },
    });
  }
}

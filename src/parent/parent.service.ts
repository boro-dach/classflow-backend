import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ParentService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    return this.prisma.parent.findFirst({
      where: { email },
    });
  }

  async generateParentCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let attempt = 0; attempt < 3; attempt++) {
      let code = '';

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }

      const exists = await this.prisma.parent.findUnique({
        where: { parentCode: code },
      });

      if (!exists) {
        return code;
      }
    }

    throw new Error(
      'Failed to generate parent code in 3 attempts, most likely there are too many collisions. Try again.',
    );
  }

  async create(dto: RegisterDto, token: string) {
    const code = await this.generateParentCode();

    return this.prisma.parent.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: await hash(dto.password),
        parentCode: code,
        age: dto.age,
        accessToken: token,
      },
    });
  }
}

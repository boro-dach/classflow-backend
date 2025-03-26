import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    return this.prisma.teacher.findFirst({
      where: { email },
    });
  }

  async create(dto: RegisterDto, token: string) {
    return this.prisma.teacher.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: await hash(dto.password),
        age: dto.age,
        accessToken: token,
      },
    });
  }
}

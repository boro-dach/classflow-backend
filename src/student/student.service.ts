import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    return this.prisma.student.findFirst({
      where: { email },
    });
  }

  async createAdult(dto: RegisterDto, token: string) {
    return this.prisma.student.create({
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

  async createMinor(dto: RegisterDto, token: string, parentId: number) {
    return this.prisma.student.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: await hash(dto.password),
        age: dto.age,
        accessToken: token,
        parentId: parentId,
      },
    });
  }
}

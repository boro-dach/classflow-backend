import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateJoinRequestDto } from './dto/join-request.dto';

@Injectable()
export class JoinRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let attempt = 0; attempt < 3; attempt++) {
      let code = '';

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
      }

      const exists = await this.prisma.user.findUnique({
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

  async create(dto: CreateJoinRequestDto) {
    const code = await this.generateCode();

    const joinRequest = await this.prisma.joinRequest.create({
      data: {
        studentId: dto.studentId,
        classId: dto.classId,
        code: code,
      },
    });

    return joinRequest;
  }

  async updateStatus(id: string, status: 'PENDING' | 'ACCEPTED' | 'REJECTED') {
    return this.prisma.joinRequest.update({
      where: { id },
      data: { status },
    });
  }
}

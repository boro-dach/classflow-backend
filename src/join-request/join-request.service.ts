import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateJoinRequestDto } from './dto/join-request.dto';

@Injectable()
export class JoinRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async generateCode(length: number = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  async create(dto: CreateJoinRequestDto) {
    const code = await this.generateCode(6);

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

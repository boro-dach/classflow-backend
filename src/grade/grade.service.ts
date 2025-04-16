import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/grade.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GradeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGradeDto) {
    const grade = await this.prisma.grade.create({
      data: dto,
    });

    return grade;
  }
}

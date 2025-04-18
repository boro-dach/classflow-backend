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

  async createInherit(dto: CreateGradeDto) {
    const lesson = await this.prisma.lesson.findFirst({
      where: { id: dto.lessonId },
    });

    const grade = await this.prisma.grade.create({
      data: {
        value: dto.value,
        weight: dto.weight,
        date: dto.date,
        studentId: dto.studentId,
        lessonId: dto.lessonId,
        theme: lesson.theme,
      },
    });

    return grade;
  }
}

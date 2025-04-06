import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLessonDto } from './dto/lesson.dto';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLessonDto) {
    const lesson = await this.prisma.lesson.create({
      data: dto,
    });

    return lesson;
  }
}

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/lesson.dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @HttpCode(200)
  @Post('create')
  async create(@Body() dto: CreateLessonDto) {
    const lesson = await this.lessonService.create(dto);

    return lesson;
  }
}

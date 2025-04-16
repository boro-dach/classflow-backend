import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/grade.dto';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @HttpCode(200)
  @Post('create')
  async create(@Body() dto: CreateGradeDto) {
    const grade = await this.gradeService.create(dto);

    return grade;
  }
}

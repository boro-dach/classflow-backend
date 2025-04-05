import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/school.dto';
import { TeacherService } from 'src/teacher/teacher.service';

@Controller('school')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly teacher: TeacherService,
  ) {}

  @HttpCode(200)
  @Post('create')
  async create(@Body() dto: CreateSchoolDto) {
    const school = await this.schoolService.createSchool(dto);

    await this.teacher.addSchool(school.id, dto.principalId);

    return school;
  }
}

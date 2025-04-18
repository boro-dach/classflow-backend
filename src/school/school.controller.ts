import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/school.dto';
import { UserService } from 'src/user/user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UserRole } from '@prisma/client';

@Controller('school')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly user: UserService,
  ) {}

  @HttpCode(200)
  @Post('create')
  async create(@Body() dto: CreateSchoolDto) {
    const school = await this.schoolService.createSchool(dto);

    return school;
  }
}

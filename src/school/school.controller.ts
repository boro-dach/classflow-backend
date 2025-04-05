import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
}

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @HttpCode(200)
  @Post('create')
  async createClass(@Body() dto: CreateClassDto) {
    const newClass = await this.classService.createClass(dto);

    return newClass;
  }
}

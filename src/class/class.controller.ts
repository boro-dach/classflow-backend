import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/class.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Auth()
  @HttpCode(200)
  @Post('create')
  async createClass(@Body() dto: CreateClassDto) {
    const newClass = await this.classService.createClass(dto);

    return newClass;
  }
}

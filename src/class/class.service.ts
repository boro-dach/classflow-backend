import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClassDto } from './dto/class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) {}

  async createClass(dto: CreateClassDto) {
    const newClass = await this.prisma.class.create({
      data: dto,
    });

    return newClass;
  }
}

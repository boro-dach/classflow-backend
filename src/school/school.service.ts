import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async createSchool(dto: CreateSchoolDto) {
    const school = await this.prisma.school.create({
      data: dto,
    });

    return school;
  }
}

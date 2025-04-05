import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { PrismaService } from 'src/prisma.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService, PrismaService, TeacherService],
})
export class SchoolModule {}

import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService, PrismaService, UserService],
})
export class SchoolModule {}

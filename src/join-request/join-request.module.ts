import { Module } from '@nestjs/common';
import { JoinRequestService } from './join-request.service';
import { JoinRequestController } from './join-request.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JoinRequestController],
  providers: [JoinRequestService, PrismaService],
})
export class JoinRequestModule {}

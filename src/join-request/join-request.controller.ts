import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { JoinRequestService } from './join-request.service';
import { CreateJoinRequestDto } from './dto/join-request.dto';

@Controller('join-request')
export class JoinRequestController {
  constructor(private readonly joinRequestService: JoinRequestService) {}

  @HttpCode(200)
  @Post('create')
  async create(@Body() dto: CreateJoinRequestDto) {
    const joinRequest = await this.joinRequestService.create(dto);

    return joinRequest;
  }

  @HttpCode(200)
  @Post('update')
  async update(
    @Body() dto: { id: string; status: 'PENDING' | 'ACCEPTED' | 'REJECTED' },
  ) {
    const joinRequest = await this.joinRequestService.updateStatus(
      dto.id,
      dto.status,
    );

    return joinRequest;
  }
}

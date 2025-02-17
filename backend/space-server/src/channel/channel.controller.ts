import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/channel')
@UseGuards(AuthGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  getChannel(): string {
    return 'get api/channel';
  }
}

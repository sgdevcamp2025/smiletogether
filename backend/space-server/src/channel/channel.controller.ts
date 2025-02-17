import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ChannelResponseDto } from './dto/channel-response.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('api/channels')
@UseGuards(AuthGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  getChannel(): string {
    return 'get api/channel';
  }

  @Post()
  async createChannel(
    @Body() createChannelDto: CreateChannelDto,
    @UserId() userId: string,
  ): Promise<ChannelResponseDto> {
    return this.channelService.createChannel(userId, createChannelDto);
  }
}

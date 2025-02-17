import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { ChannelResponseDto } from './dto/channel-response.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { WorkspaceChannelDto } from './dto/workspace-channel.dto';
import { ChannelDetailsDto } from './dto/channel-detail.dto';

@Controller('api/channels')
@UseGuards(AuthGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  getChannel(): string {
    return 'Hello Channel API!';
  }

  @Post()
  async createChannel(
    @Body() createChannelDto: CreateChannelDto,
    @UserId() userId: string,
  ): Promise<ChannelResponseDto> {
    return this.channelService.createChannel(userId, createChannelDto);
  }

  @Get('workspaces/:workspaceId')
  async getChannelsByUser(
    @UserId() userId: string,
    @Param('workspaceId') workspaceId: string,
  ): Promise<WorkspaceChannelDto> {
    return this.channelService.getChannelsByUser(userId, workspaceId);
  }

  @Get(':channelId')
  async getChannelById(
    @Param('channelId') channelId: string,
  ): Promise<ChannelDetailsDto> {
    return this.channelService.getChannelById(channelId);
  }

  @Post(':channelId/join')
  async joinChannel(
    @UserId() userId: string,
    @Param('channelId') channelId: string,
  ): Promise<any> {
    return this.channelService.joinChannel(userId, channelId);
  }
}

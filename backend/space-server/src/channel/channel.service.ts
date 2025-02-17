import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ChannelResponseDto } from './dto/channel-response.dto';
import { CreateChannelDto } from './dto/create-channel.dto';

@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  async createChannel(
    userId: string,
    createChannelDto: CreateChannelDto,
  ): Promise<ChannelResponseDto> {
    const { workspaceId, channelName, description, isPrivate } =
      createChannelDto;

    const workspaceUser = await this.prismaService.workspaceUser.findUnique({
      where: {
        user_id_workspace_id: {
          user_id: userId,
          workspace_id: workspaceId,
        },
      },
    });

    if (!workspaceUser) {
      throw new ForbiddenException(
        '해당 워크스페이스에 소속되지 않은 사용자입니다',
      );
    }

    const newChannel = await this.prismaService.channel.create({
      data: {
        workspace_id: workspaceId,
        name: channelName,
        description: description,
        is_private: isPrivate,
      },
    });

    await this.prismaService.channelUser.create({
      data: {
        user_id: userId,
        channel_id: newChannel.channel_id,
        channel_role: 'admin',
      },
    });

    const channelResponse: ChannelResponseDto = {
      channelId: newChannel.channel_id,
      channelName: newChannel.name,
      description: newChannel.description || '',
      isPrivate: newChannel.is_private,
      createdAt: newChannel.created_at,
    };

    return channelResponse;
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ChannelResponseDto } from './dto/channel-response.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import {
  ChannelItemDto,
  WorkspaceChannelDto,
} from './dto/workspace-channel.dto';

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
      throw new ForbiddenException('해당 워크스페이스에 접근 권한이 없습니다.');
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

  async getChannelsByUser(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceChannelDto> {
    const workspace = await this.prismaService.workspace.findUnique({
      where: { workspace_id: workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException('워크스페이스를 찾을 수 없습니다');
    }

    const workspaceUser = await this.prismaService.workspaceUser.findUnique({
      where: {
        user_id_workspace_id: {
          user_id: userId,
          workspace_id: workspaceId,
        },
      },
    });

    if (!workspaceUser) {
      throw new ForbiddenException('해당 워크스페이스에 접근 권한이 없습니다.');
    }

    const channels = await this.prismaService.channel.findMany({
      where: {
        workspace_id: workspaceId,
      },
      select: {
        channel_id: true,
        name: true,
        is_private: true,
      },
    });

    const channelItems: ChannelItemDto[] = channels.map((channel) => ({
      channelId: channel.channel_id,
      name: channel.name,
      isPrivate: channel.is_private,
    }));

    return {
      channels: channelItems,
    };
  }
}

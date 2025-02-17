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
import { ChannelDetailsDto } from './dto/channel-detail.dto';

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
      throw new NotFoundException(
        `워크스페이스 ID ${workspaceId}를 찾을 수 없습니다`,
      );
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
      throw new ForbiddenException(
        `워크스페이스 ID ${workspaceId}에 대한 접근 권한이 없습니다다`,
      );
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

  async getChannelById(channelId: string): Promise<ChannelDetailsDto> {
    const channel = await this.prismaService.channel.findUnique({
      where: { channel_id: channelId },
    });

    if (!channel) {
      throw new NotFoundException(`채널 ID ${channelId}를 찾을 수 없습니다.`);
    }

    const channelUsers = await this.prismaService.channelUser.findMany({
      where: { channel_id: channelId },
      select: {
        user_id: true,
      },
    });

    const userIds = channelUsers.map((user) => user.user_id);
    const members = await this.prismaService.workspaceUser.findMany({
      where: {
        user_id: { in: userIds },
      },
      select: {
        user_id: true,
        profile_name: true,
        profile_image: true,
      },
    });

    const mappedMembers = members.map((member) => ({
      userId: member.user_id,
      nickname: member.profile_name,
      profileImage: member.profile_image,
    }));

    return {
      channelId: channel.channel_id,
      name: channel.name,
      description: channel.description,
      isPrivate: channel.is_private,
      members: mappedMembers,
      createdAt: channel.created_at.toISOString(),
      lastActiveAt: channel.updated_at.toISOString(),
    };
  }
}

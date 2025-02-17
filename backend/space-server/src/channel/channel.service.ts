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
    const { workspaceId, name, description, isPrivate } = createChannelDto;

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
        name: name,
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
      name: newChannel.name,
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

  async joinChannel(userId: string, channelId: string): Promise<any> {
    const channel = await this.prismaService.channel.findUnique({
      where: { channel_id: channelId },
    });

    if (!channel) {
      throw new NotFoundException(`채널 ID ${channelId}를 찾을 수 없습니다.`);
    }

    const workspaceUser = await this.prismaService.workspaceUser.findUnique({
      where: {
        user_id_workspace_id: {
          user_id: userId,
          workspace_id: channel.workspace_id,
        },
      },
    });

    if (!workspaceUser) {
      throw new ForbiddenException(
        `워크스페이스 ID ${channel.workspace_id}에 소속되어있지 않습니다`,
      );
    }

    const channelUser = await this.prismaService.channelUser.findUnique({
      where: {
        user_id_channel_id: {
          user_id: userId,
          channel_id: channelId,
        },
      },
    });

    if (channelUser) {
      return {
        message: 'User is already a member of the channel.',
        channelId: channelId,
      };
    }

    const newChannelUser = await this.prismaService.channelUser.create({
      data: {
        user_id: userId,
        channel_id: channelId,
        channel_role: 'member',
      },
    });

    return {
      message: 'Joined channel successfully.',
      channelId: newChannelUser.channel_id,
    };
  }

  async leaveChannel(channelId: string, userId: string): Promise<any> {
    const channel = await this.prismaService.channel.findUnique({
      where: {
        channel_id: channelId,
      },
      include: {
        ChannelUser: true,
      },
    });

    if (!channel) {
      throw new NotFoundException(`Workspace with ID ${channelId} not found`);
    }

    const leavingUser = channel.ChannelUser.find(
      (user) => user.user_id === userId,
    );

    if (!leavingUser) {
      throw new NotFoundException(`User is not a member of this channel`);
    }

    // 만약 마지막 유저라면 channel 자체를 삭제
    if (channel.ChannelUser.length === 1) {
      await this.prismaService.channel.delete({
        where: {
          channel_id: channelId,
        },
      });

      return {
        message: 'Channel has been deleted as you were the last member',
      };
    }

    // admin이 탈퇴하는 경우, 탈퇴 전 ownership transfer 필요
    if (leavingUser.channel_role === 'admin')
      return {
        error: 'Channel owner cannot leave. Transfer ownership first.',
      };

    //user 삭제
    await this.prismaService.channelUser.delete({
      where: {
        mapping_id: leavingUser.mapping_id,
      },
    });

    return {
      message: 'Successfuly deleted',
    };
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ChannelResponseDto } from './dto/channel-response.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import {
  ChannelItemDto,
  WorkspaceChannelDto,
} from './dto/workspace-channel.dto';
import { ChannelDetailsDto } from './dto/channel-detail.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  getEmailByUserId = async (userId: string): Promise<string> => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/identify-email?userId=${encodeURIComponent(userId)}`,
      );
      if (!response.ok) {
        console.log(response);
        return '해당 userId의 email이 존재하지 않습니다.';
      }
      const data = await response.json();
      return data.email || '해당 userId의 email이 존재하지 않습니다.';
    } catch (error) {
      console.error(error);
      return '해당 userId의 email이 존재하지 않습니다.';
    }
  };

  getUserIdByEmail = async (email: string): Promise<string> => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/check-memberId?email=${encodeURIComponent(email)}`,
      );
      if (!response.ok) return '해당 email의 userId가 존재하지 않습니다.';
      const data = await response.json();
      return data.userId || '해당 email의 userId가 존재하지 않습니다.';
    } catch (error) {
      console.error(error);
      return '해당 email의 userId가 존재하지 않습니다.';
    }
  };

  async inviteChannels(
    emails: string[],
    channelIdList: string[],
  ): Promise<{
    success: { email: string; channelId: string }[];
    failed: { email: string; channelId?: string; message: string }[];
  }> {
    const inviteResults = {
      success: [],
      failed: [],
    };

    for (const email of emails) {
      const userId = await this.getUserIdByEmail(email);
      if (!userId || userId === '해당 email의 userId가 존재하지 않습니다.') {
        inviteResults.failed.push({ email, message: 'User ID not found.' });
        continue;
      }
      for (const channelId of channelIdList) {
        try {
          await this.joinChannel(userId, channelId);
          inviteResults.success.push({ email, channelId });
        } catch (error) {
          inviteResults.failed.push({
            email,
            channelId,
            message: error.message,
          });
        }
      }
    }
    return inviteResults;
  }

  async createChannel(
    userId: string,
    createChannelDto: CreateChannelDto,
  ): Promise<ChannelResponseDto> {
    const { workspaceId, name, isPrivate, emails } = createChannelDto;

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
        description: `${name} 채널입니다.`,
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

    for (const email of emails) {
      const newUserId = await this.getUserIdByEmail(email);
      if (isUUID(newUserId))
        await this.joinChannel(newUserId, newChannel.channel_id);
      else
        console.log(
          '해당 이메일로 조회된 userId가 올바르지 않습니다.',
          '조회 한 userEmail: ',
          email,
          '조회 된 userId: ',
          newUserId,
        );
    }

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

    const userChannels = await this.prismaService.channelUser.findMany({
      where: { user_id: userId },
      select: { channel_id: true },
    });

    const channelIds = userChannels.map((channel) => channel.channel_id);

    const channels = await this.prismaService.channel.findMany({
      where: {
        workspace_id: workspaceId,
        channel_id: { in: channelIds },
      },
      select: {
        channel_id: true,
        name: true,
        is_private: true,
      },
    });

    return {
      channels: channels.map((channel) => ({
        channelId: channel.channel_id,
        name: channel.name,
        isPrivate: channel.is_private,
      })),
    };
  }

  async getAllChannelsInWorkspace(
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
        channel_role: true,
      },
    });

    if (channelUsers.length === 0) {
      return {
        channelId: channel.channel_id,
        channelName: channel.name,
        createdBy: null,
        description: channel.description,
        isPrivate: channel.is_private,
        totalMembers: 0,
        members: [],
        createdAt: channel.created_at.toISOString(),
      };
    }

    const userIds = channelUsers.map((user) => user.user_id);
    const members = await this.prismaService.workspaceUser.findMany({
      where: {
        user_id: { in: userIds },
        workspace_id: channel.workspace_id,
      },
      select: {
        user_id: true,
        profile_name: true,
        profile_image: true,
        role: true,
        status_message: true,
      },
    });

    const adminUserId = channelUsers.find(
      (user) => user.channel_role === 'admin',
    )?.user_id;
    const adminUser =
      members.find((member) => member.user_id === adminUserId) ?? null;

    const mappedAdminUser = adminUser
      ? {
          userId: adminUser.user_id,
          nickname: adminUser.profile_name,
          displayName: adminUser.profile_name,
          profileImage: adminUser.profile_image,
          position: 'admin',
          isActive: true,
          statusMessage: adminUser.status_message,
        }
      : null;

    const mappedMembers = members.map((member) => ({
      userId: member.user_id,
      nickname: member.profile_name,
      displayName: member.profile_name,
      profileImage: member.profile_image,
      position: member.role,
      isActive: true,
      statusMessage: member.status_message,
    }));

    return {
      channelId: channel.channel_id,
      channelName: channel.name,
      createdBy: mappedAdminUser,
      description: channel.description,
      isPrivate: channel.is_private,
      totalMembers: mappedMembers.length,
      members: mappedMembers,
      createdAt: channel.created_at.toISOString(),
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
        channelId: channelId,
        message: 'User is already a member of the channel.',
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

  async deleteChannel(channelId: string, userId: string): Promise<any> {
    const channel = await this.prismaService.channel.findUnique({
      where: {
        channel_id: channelId,
      },
      include: {
        ChannelUser: {
          where: {
            channel_role: 'admin',
            user_id: userId,
          },
        },
      },
    });

    if (!channel) {
      throw new NotFoundException(`Channel with ID ${channelId} not found`);
    }

    if (channel.ChannelUser.length === 0) {
      throw new UnauthorizedException(
        'You do not have permission to delete this channel.',
      );
    }

    const deletedChannel = await this.prismaService.channel.delete({
      where: {
        channel_id: channelId,
      },
    });

    return {
      channelId: deletedChannel.channel_id,
      status: 'channel deleted',
    };
  }

  async searchUserByName(channelId: string, name: string): Promise<any> {
    const channelUsers = await this.prismaService.channelUser.findMany({
      where: {
        channel_id: channelId,
      },
      select: { user_id: true },
    });

    const userIds = channelUsers.map((user) => user.user_id);

    const workspaceUsers = await this.prismaService.workspaceUser.findMany({
      where: {
        user_id: { in: userIds }, // 채널에 속한 유저들만 필터링
        profile_name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return {
      users: workspaceUsers.map((user) => ({
        userId: user.user_id,
        username: user.profile_name,
        displayName: user.profile_name,
        profileImage: user.profile_image,
        position: user.position,
        isActive: true,
        role: user.role,
        statusMessage: user.status_message,
      })),
    };
  }
}

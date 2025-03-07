import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InviteService } from 'src/invite/invite.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceResponseDto } from './dto/workspcae-response.dto';
import { WorkspaceSearchResponseDto } from './dto/search-workspace.dto';
import { WorkspaceDetailResponseDto } from './dto/workspace-detail.dto';
import { WorkspaceDeleteResponseDto } from './dto/delete-workspace.dto';
import { InviteWorkspaceDto } from './dto/invite-workspace.dto';
import { ProfileResponseDto } from 'src/common/dto/profile-response.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly inviteService: InviteService,
  ) {}
  private readonly logger = new Logger(WorkspaceService.name);

  getEmailByUserId = async (userId: string): Promise<string> => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/identify-email?userId=${userId}`,
      );
      if (!response.ok) return '해당 userId의 email이 존재하지 않습니다.';
      const data = await response.json();
      return data.email || '해당 userId의 email이 존재하지 않습니다.';
    } catch (error) {
      console.error(error);
      return '해당 userId의 email이 존재하지 않습니다.';
    }
  };

  async getUserWorkspaces(userId: string): Promise<any> {
    const workspaces = await this.prismaService.workspace.findMany({
      where: {
        WorkspaceUser: {
          some: {
            user_id: { equals: userId },
          },
        },
      },
      select: {
        workspace_id: true,
        name: true,
        workspace_image: true,
        WorkspaceUser: {
          select: {
            user_id: true,
            profile_image: true,
          },
        },
        _count: {
          select: {
            WorkspaceUser: true,
          },
        },
      },
    });

    return {
      userWorkspaces: {
        email: await this.getEmailByUserId(userId),
        workspaces: workspaces.map((workspace) => ({
          workspaceId: workspace.workspace_id,
          name: workspace.name,
          profileImage: workspace.workspace_image,
          memberCount: workspace._count.WorkspaceUser,
          workspaceMembers: workspace.WorkspaceUser.map((member) => ({
            userId: member.user_id,
            profileImage: member.profile_image,
          })),
        })),
      },
    };
  }

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    const { workspaceName, ownerId, userName, profileImage, inviteUserList } =
      createWorkspaceDto;

    const inviteResults = {
      success: [],
      failed: [],
    };

    return await this.prismaService.$transaction(async (prisma) => {
      // 워크스페이스 생성
      const workspace = await prisma.workspace.create({
        data: {
          name: workspaceName,
          workspace_image: profileImage || 'default.jpg',
        },
      });

      // 워크스페이스 소유자 추가
      await prisma.workspaceUser.create({
        data: {
          workspace_id: workspace.workspace_id,
          user_id: ownerId,
          role: 'admin',
          profile_name: userName,
          profile_image: profileImage || 'default.jpg',
          position: '',
          status_message: '',
        },
      });

      // 기본 채널 생성
      const defaultChannel = await prisma.channel.create({
        data: {
          workspace_id: workspace.workspace_id,
          name: '전체',
          description: '모두를 위한 전체 채널입니다.',
          is_private: false,
        },
      });

      // 소유자를 기본 채널에 추가
      await prisma.channelUser.create({
        data: {
          channel_id: defaultChannel.channel_id,
          user_id: ownerId,
          channel_role: 'admin',
        },
      });

      // 초대된 사용자들 처리
      for (const userId of inviteUserList) {
        try {
          // 워크스페이스 멤버로 추가
          await prisma.workspaceUser.create({
            data: {
              workspace_id: workspace.workspace_id,
              user_id: userId,
              role: 'member',
              profile_name: `${userId}번 유저`, // 추후 사용자 DB에서 이름 가져오기
              profile_image: 'default.jpg',
              position: '',
              status_message: '',
            },
          });

          // 기본 채널에 추가
          await prisma.channelUser.create({
            data: {
              channel_id: defaultChannel.channel_id,
              user_id: userId,
              channel_role: 'member',
            },
          });

          inviteResults.success.push(userId);
        } catch (error) {
          this.logger.error(`Failed to invite user ${userId}:`, error);
          inviteResults.failed.push(userId);
        }
      }

      // response
      return {
        workspaceId: workspace.workspace_id,
        name: workspaceName,
        creator: ownerId,
        defaultChannel: defaultChannel.channel_id,
        profileImage: profileImage || 'default.jpg',
        inviteResults,
        createdAt: workspace.created_at,
      };
    });
  }

  async searchWorkspacesByName(
    name: string,
  ): Promise<WorkspaceSearchResponseDto> {
    const workspaces = await this.prismaService.workspace.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive', //대소문자 구문 x
        },
      },
      include: {
        WorkspaceUser: {
          where: {
            role: 'admin',
          },
          take: 1,
        },
      },
    });

    return {
      workspaces: workspaces.map((workspace) => ({
        workspaceId: workspace.workspace_id,
        name: workspace.name,
        ownerId: workspace.WorkspaceUser[0].user_id,
        nickname: workspace.WorkspaceUser[0].profile_name,
      })),
    };
  }

  async inviteWorkspace(
    workspaceId: string,
    inviteWorkspaceDto: InviteWorkspaceDto,
  ) {
    const { inviteUserList } = inviteWorkspaceDto;

    const inviteResults = {
      success: [],
      failed: [],
    };
    return await this.prismaService.$transaction(async (prisma) => {
      const workspace = await prisma.workspace.findUnique({
        where: {
          workspace_id: workspaceId,
        },
      });

      if (!workspace) {
        throw new NotFoundException(
          `Workspace with ID ${workspaceId} not found`,
        );
      }

      const defaultChannels = await prisma.channel.findMany({
        where: {
          workspace_id: workspaceId,
          is_private: false,
        },
      });

      const existingMembers = await prisma.workspaceUser.findMany({
        where: {
          workspace_id: workspaceId,
        },
        select: {
          user_id: true,
        },
      });

      const existingMemberIds = existingMembers.map((member) => member.user_id);

      for (const userId of inviteUserList) {
        try {
          if (existingMemberIds.includes(userId)) {
            inviteResults.failed.push(userId);
            continue;
          }

          // 워크스페이스 멤버로 추가
          await prisma.workspaceUser.create({
            data: {
              workspace_id: workspaceId,
              user_id: userId,
              role: 'member',
              profile_name: `${userId}번 유저`, // 추후 사용자 DB에서 이름 가져오기
              profile_image: 'default.jpg',
              position: '',
              status_message: '',
            },
          });

          // 기본 채널에 추가
          for (const defaultChannel of defaultChannels) {
            await prisma.channelUser.create({
              data: {
                channel_id: defaultChannel.channel_id,
                user_id: userId,
                channel_role: 'member',
              },
            });
          }

          inviteResults.success.push(userId);
        } catch (error) {
          this.logger.error(`Failed to invite user ${userId}:`, error);
          inviteResults.failed.push(userId);
        }
      }

      // response
      return {
        workspaceId: workspaceId,
        inviteResults,
      };
    });
  }

  async getWorkspaceById(
    workspaceId: string,
  ): Promise<WorkspaceDetailResponseDto> {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        workspace_id: workspaceId,
      },
      include: {
        WorkspaceUser: {
          select: {
            user_id: true,
            profile_image: true,
            profile_name: true,
            role: true,
          },
          orderBy: {
            role: 'desc', // admin이 먼저 오도록 정렬
          },
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
    }

    const pendingInvites =
      await this.inviteService.getPendingInvites(workspaceId);

    const usersWithEmail = await Promise.all(
      workspace.WorkspaceUser.map(async (user) => ({
        userId: user.user_id,
        userEmail: await this.getEmailByUserId(user.user_id),
        nickName: user.profile_name,
        profileImage: user.profile_image || '',
        role: user.role,
      })),
    );

    return {
      workspaceId: workspace.workspace_id,
      name: workspace.name,
      ownerId: workspace.WorkspaceUser.find((user) => user.role === 'admin')
        ?.user_id,
      profileImage: workspace.workspace_image,
      users: [
        ...usersWithEmail,
        ...pendingInvites.emails.map((email) => ({
          userId: '',
          userEmail: email,
          nickName: email.split('@')[0],
          profileImage: '',
          role: 'pending_member',
        })),
      ],
      createdAt: workspace.created_at,
      updatedAt: workspace.updated_at,
    };
  }

  async deleteWorkspaceById(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceDeleteResponseDto> {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        workspace_id: workspaceId,
      },
      include: {
        WorkspaceUser: {
          where: {
            role: 'admin',
            user_id: userId,
          },
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
    }

    if (workspace.WorkspaceUser.length === 0) {
      throw new UnauthorizedException(
        'You do not have permission to delete this workspace.',
      );
    }

    const deletedWorkspace = await this.prismaService.workspace.delete({
      where: {
        workspace_id: workspaceId,
      },
    });

    return {
      workspaceId: deletedWorkspace.workspace_id,
      status: 'workspace deleted',
    };
  }

  async leaveWorkspace(workspaceId: string, userId: string): Promise<any> {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        workspace_id: workspaceId,
      },
      include: {
        WorkspaceUser: true,
      },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
    }

    const leavingUser = workspace.WorkspaceUser.find(
      (user) => user.user_id === userId,
    );

    if (!leavingUser) {
      throw new NotFoundException(`User is not a member of this workspace`);
    }

    // 만약 마지막 유저라면 workspace 자체를 삭제
    if (workspace.WorkspaceUser.length === 1) {
      await this.prismaService.workspace.delete({
        where: {
          workspace_id: workspaceId,
        },
      });

      return {
        message: 'Workspace has been deleted as you were the last member',
      };
    }

    // admin이 탈퇴하는 경우, 탈퇴 전 ownership transfer 필요
    if (leavingUser.role === 'admin')
      return {
        error: 'Workspace owner cannot leave. Transfer ownership first.',
      };

    //user 삭제
    await this.prismaService.workspaceUser.delete({
      where: {
        profile_id: leavingUser.profile_id,
      },
    });

    return {
      message: 'Successfuly deleted',
    };
  }

  async getWorkspaceUser(
    workspaceId: string,
    userId: string,
  ): Promise<ProfileResponseDto> {
    const workspaceUser = await this.prismaService.workspaceUser.findUnique({
      where: {
        user_id_workspace_id: {
          user_id: userId,
          workspace_id: workspaceId,
        },
      },
      select: {
        user_id: true,
        profile_name: true,
        profile_image: true,
        role: true,
        status_message: true,
        position: true,
        workspace: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!workspaceUser) {
      throw new NotFoundException(
        `User ${userId} not found in workspace ${workspaceId}`,
      );
    }

    return {
      userId: workspaceUser.user_id,
      username: workspaceUser.profile_name,
      displayName: workspaceUser.profile_name,
      profileImage: workspaceUser.profile_image,
      position: workspaceUser.position,
      isActive: true,
      role: workspaceUser.role,
      statusMessage: workspaceUser.status_message,
    };
  }

  async searchUserByName(workspaceId: string, name: string): Promise<any> {
    const workspaceUsers = await this.prismaService.workspaceUser.findMany({
      where: {
        profile_name: {
          contains: name,
          mode: 'insensitive',
        },
        workspace_id: workspaceId,
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

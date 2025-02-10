import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceResponseDto } from './dto/workspcae-response.dto';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(WorkspaceService.name);

  async findAll() {
    return this.prismaService.workspace.findMany();
  }

  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    const {
      workspace_name,
      owner_id,
      user_name,
      profile_image,
      invite_user_list,
    } = createWorkspaceDto;

    const inviteResults = {
      success: [],
      failed: [],
    };

    try {
      return await this.prismaService.$transaction(async (prisma) => {
        // 워크스페이스 생성
        const workspace = await prisma.workspace.create({
          data: {
            name: workspace_name,
            workspace_image: profile_image || 'default.jpg',
          },
        });

        // 워크스페이스 소유자 추가
        await prisma.workspaceUser.create({
          data: {
            workspace_id: workspace.workspace_id,
            user_id: owner_id,
            role: 'admin',
            profile_name: user_name,
            profile_image: profile_image || 'default.jpg',
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
            user_id: owner_id,
            channel_role: 'admin',
          },
        });

        // 초대된 사용자들 처리
        for (const userId of invite_user_list) {
          try {
            // 워크스페이스 멤버로 추가
            await prisma.workspaceUser.create({
              data: {
                workspace_id: workspace.workspace_id,
                user_id: userId,
                role: 'member',
                profile_name: `${userId}번 유저`, // 사용자 DB에서 이름 가져오기
                profile_image: 'default.jpg',
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
          workspaceId: `workspace_${workspace.workspace_id}`,
          name: workspace_name,
          creator: owner_id,
          defaultChannel: `channel_${defaultChannel.channel_id}`,
          profileImage: profile_image || 'default.jpg',
          inviteResults,
          createdAt: workspace.created_at,
        };
      });
    } catch (error) {
      this.logger.error('Failed to create workspace:', error);
      throw error;
    }
  }
}

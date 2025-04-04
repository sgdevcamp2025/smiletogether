import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Redis, RedisKey } from 'ioredis';
import { PrismaService } from 'prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InviteService {
  private readonly redis: Redis | null;
  private readonly INVITE_CODE_EXPIRATION = 60 * 60; // 1시간

  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getOrThrow();
  }

  async generateInviteLink(
    domain: string,
    workspaceId: string,
  ): Promise<string> {
    const inviteCode = uuidv4();
    const inviteKey = `invite_link:${inviteCode}`;
    const inviteUrl = `${domain}/invite?type=link&code=${inviteCode}`;

    await this.redis.set(
      inviteKey,
      workspaceId,
      'EX',
      this.INVITE_CODE_EXPIRATION,
    );

    return inviteUrl;
  }

  async acceptInviteLink(
    inviteCode: string,
    userId: string,
    userName: string,
  ): Promise<{ workspaceId: string }> {
    const inviteKey = `invite_link:${inviteCode}`;

    const workspaceId = await this.redis.get(inviteKey);
    if (!workspaceId) {
      throw new NotFoundException(
        '초대 링크가 만료되었거나 존재하지 않습니다.',
      );
    }

    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        workspace_id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('해당 워크스페이스가 존재하지 않습니다.');
    }

    const existingMember = await this.prismaService.workspaceUser.findFirst({
      where: { workspace_id: workspaceId, user_id: userId },
    });

    if (existingMember) {
      throw new BadRequestException('이미 워크스페이스에 참여 중입니다.');
    }

    await this.prismaService.workspaceUser.create({
      data: {
        workspace_id: workspace.workspace_id,
        user_id: userId,
        role: 'member',
        profile_name: userName,
        profile_image: 'default.jpg',
        position: '',
        status_message: '',
      },
    });

    const defaultChannels = await this.prismaService.channel.findMany({
      where: {
        workspace_id: workspaceId,
        is_private: false,
      },
    });

    for (const defaultChannel of defaultChannels) {
      await this.prismaService.channelUser.create({
        data: {
          channel_id: defaultChannel.channel_id,
          user_id: userId,
          channel_role: 'member',
        },
      });
    }

    return { workspaceId };
  }

  async isWorkspaceUser(inviteCode: string, userId: string, type: string) {
    let inviteKey: RedisKey;
    if (type == 'link') inviteKey = `invite_link:${inviteCode}`;
    else if (type == 'email') inviteKey = `invite_email:${inviteCode}`;
    else throw new BadRequestException('유효하지 않은 type 값입니다.');

    const workspaceId = await this.redis.get(inviteKey);
    if (!workspaceId) {
      throw new NotFoundException(
        '초대 링크가 만료되었거나 존재하지 않습니다.',
      );
    }

    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        workspace_id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('해당 워크스페이스가 존재하지 않습니다.');
    }

    const existingMember = await this.prismaService.workspaceUser.findFirst({
      where: { workspace_id: workspaceId, user_id: userId },
    });

    if (existingMember) {
      return {
        isWorkspaceMember: true,
        message: '초대된 워크스페이스에 소속되어 있습니다.',
        workspaceId: workspaceId,
      };
    }

    return {
      isWorkspaceMember: false,
      message: '초대된 워크스페이스에 소속되어 있지 않습니다.',
      workspaceId: workspaceId,
      workspaceName: workspace.name,
    };
  }

  async generateEmailInvites(
    domain: string,
    inviteEmailList: string[],
    workspaceId: string,
  ): Promise<{
    inviteUrls: { email: string; url: string }[];
    inviteResults: { success: string[]; failed: string[] };
  }> {
    const inviteResults = {
      success: [],
      failed: [],
    };

    const inviteUrls = [];

    for (const email of inviteEmailList) {
      try {
        const inviteCode = uuidv4();
        const inviteKey = `invite_email:${inviteCode}`;
        const inviteUrl = `${domain}/invite/email/${inviteCode}`;

        await this.redis.set(
          inviteKey,
          JSON.stringify({ workspaceId, email }),
          'EX',
          this.INVITE_CODE_EXPIRATION,
        );

        const pendingInvitesKey = `pending_invites:${workspaceId}`;
        await this.redis.sadd(pendingInvitesKey, email);

        inviteUrls.push({ email, url: inviteUrl });

        await fetch(
          `http://localhost:8080/api/auth/send-inviteUrl?email=${encodeURIComponent(email)}&inviteUrl=${encodeURIComponent(inviteUrl)}`,
          {
            method: 'GET',
          },
        );

        inviteResults.success.push(email);
      } catch (error) {
        console.error(error);
        inviteResults.failed.push(email);
      }
    }
    console.log(inviteUrls, inviteResults);

    return { inviteUrls, inviteResults };
  }

  async getPendingInvites(
    workspaceId: string,
  ): Promise<{ key: string; emails: string[] }> {
    const pendingInvitesKey = `pending_invites:${workspaceId}`;
    const emails = await this.redis.smembers(pendingInvitesKey);

    return { key: pendingInvitesKey, emails };
  }

  async acceptInviteEmail(
    inviteCode: string,
    userId: string,
    userName: string,
  ): Promise<{ workspaceId: string }> {
    const inviteKey = `invite_email:${inviteCode}`;

    const inviteData = await this.redis.get(inviteKey);

    if (!inviteData) {
      throw new NotFoundException(
        '초대 링크가 만료되었거나 존재하지 않습니다.',
      );
    }

    const { workspaceId, email } = JSON.parse(inviteData);

    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        workspace_id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('해당 워크스페이스가 존재하지 않습니다.');
    }

    const existingMember = await this.prismaService.workspaceUser.findFirst({
      where: { workspace_id: workspaceId, user_id: userId },
    });

    if (existingMember) {
      throw new BadRequestException('이미 워크스페이스에 참여 중입니다.');
    }

    await this.prismaService.workspaceUser.create({
      data: {
        workspace_id: workspace.workspace_id,
        user_id: userId,
        role: 'member',
        profile_name: userName,
        profile_image: 'default.jpg',
        position: '',
        status_message: '',
      },
    });

    const defaultChannels = await this.prismaService.channel.findMany({
      where: {
        workspace_id: workspaceId,
        is_private: false,
      },
    });

    for (const defaultChannel of defaultChannels) {
      await this.prismaService.channelUser.create({
        data: {
          channel_id: defaultChannel.channel_id,
          user_id: userId,
          channel_role: 'member',
        },
      });
    }

    await this.redis.del(inviteKey);

    const pendingInvitesKey = `pending_invites:${workspaceId}`;
    await this.redis.srem(pendingInvitesKey, email);

    return { workspaceId };
  }

  async getAllInviteData(): Promise<{ key: string; value: string }[]> {
    const keys = await this.redis.keys('invite_*');
    const data = [];

    for (const key of keys) {
      const value =
        (await this.redis.get(key)) || (await this.redis.smembers(key));
      data.push({ key, value });
    }

    return data;
  }
}

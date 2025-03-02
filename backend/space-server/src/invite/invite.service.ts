import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InviteService {
  private readonly redis: Redis | null;
  private readonly INVITE_CODE_EXPIRATION = 60 * 60; // 1시간

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  async generateInviteLink(
    domain: string,
    workspaceId: string,
  ): Promise<string> {
    const inviteCode = uuidv4();
    const inviteKey = `invite_link:${inviteCode}`;
    const inviteUrl = `${domain}/invite/link/${inviteCode}`;

    await this.redis.set(
      inviteKey,
      workspaceId,
      'EX',
      this.INVITE_CODE_EXPIRATION,
    );

    return inviteUrl;
  }
}

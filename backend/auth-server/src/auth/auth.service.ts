import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redis: Redis | null;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  async setRefreshToken(refreshToken: string, ttl: number): Promise<void> {
    await this.redis.set(refreshToken, refreshToken, 'EX', ttl);
  }

  async getRefreshToken(refreshToken: string): Promise<string | null> {
    return await this.redis.get(refreshToken);
  }
}

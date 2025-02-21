import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redis: Redis | null;
  private readonly ACCESS_TOKEN_EXPIRATION = 60 * 60; // 1시간
  private readonly REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24 * 7; // 7일

  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {
    this.redis = this.redisService.getOrThrow();
  }

  async login(userId: string) {
    const tokens = await this.generateTokens(userId);

    await this.setRefreshToken(
      `userId:${userId}`,
      tokens.refreshToken,
      this.REFRESH_TOKEN_EXPIRATION,
    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  private async generateTokens(userId: string) {
    const payload = {
      userId: userId,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'access-secret-key',
      expiresIn: this.ACCESS_TOKEN_EXPIRATION,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      expiresIn: this.REFRESH_TOKEN_EXPIRATION,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async setRefreshToken(
    key: string,
    value: string,
    ttl: number,
  ): Promise<void> {
    await this.redis.set(key, value, 'EX', ttl);
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    return await this.redis.get(`userId:${userId}`);
  }
}

import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    return {
      accessToken: await this.generateAccessToken(payload),
      refreshToken: await this.generateRefreshToken(payload),
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

  async generateAccessToken(payload: {
    userId: string;
  }): Promise<string | null> {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'access-secret-key',
      expiresIn: this.ACCESS_TOKEN_EXPIRATION,
    });
    return accessToken;
  }

  async generateRefreshToken(payload: {
    userId: string;
  }): Promise<string | null> {
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      expiresIn: this.REFRESH_TOKEN_EXPIRATION,
    });
    return refreshToken;
  }

  async verifyAccessToken(token: string): Promise<{ userId: string }> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET || 'access-secret-key',
      });

      if (!payload.userId) {
        throw new UnauthorizedException('토큰에 userId가 존재하지 않습니다.');
      }

      return { userId: payload.userId };
    } catch (error) {
      if (error) throw new UnauthorizedException(error.message);
    }
  }

  async verifyRefreshToken(token: string): Promise<{ userId: string }> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      });

      if (!payload.userId) {
        throw new UnauthorizedException('토큰에 userId가 존재하지 않습니다.');
      }

      if (token != (await this.getRefreshToken(payload.userId)))
        throw new UnauthorizedException('RefreshToken이 존재하지 않습니다.');

      return payload;
    } catch (error) {
      if (error) throw new UnauthorizedException(error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessTokens(userId: string) {
    const payload = { userId: userId };
    const accessToken = this.jwtService.sign(payload);
    console.log(accessToken);
    return accessToken;
  }

  async generateRefreshTokens(userId: string) {
    const payload = { userId: userId };

    return this.jwtService.sign(payload);
  }

  async generateTokens(userId: string) {
    const accessToken = await this.generateAccessTokens(userId);
    const refreshToken = await this.generateRefreshTokens(userId);
    console.log(accessToken, refreshToken);

    return { accessToken, refreshToken };
  }
}

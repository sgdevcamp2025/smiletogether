import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('userId') userId: string) {
    const tokens = await this.authService.generateTokens(userId);
    return tokens;
  }
}

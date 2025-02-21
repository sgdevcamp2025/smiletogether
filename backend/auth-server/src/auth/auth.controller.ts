import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('userId') userId: string) {
    return this.authService.login(userId);
  }

  @Get('getRefreshToken/:userId')
  async getRefreshToken(@Param('userId') userId: string): Promise<string> {
    return await this.authService.getRefreshToken(userId);
  }
}

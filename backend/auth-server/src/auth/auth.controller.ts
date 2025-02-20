import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('getRefreshToken')
  async getRefreshToken(): Promise<string> {
    return this.authService.getRefreshToken('test');
  }

  @Get('setRefreshToken')
  async setRefreshToken(): Promise<void> {
    return this.authService.setRefreshToken('test', 1000);
  }
}

import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('userId') userId: string, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(userId);

    res.setHeader('Authorization', `Bearer ${accessToken}`);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: 'Login successful' });
  }

  @Get('verifyAccessToken')
  async verifyAccessToken(@Req() req: Request) {
    const accessToken = req.headers['authorization']
      .replace('Bearer ', '')
      .trim();
    console.log(req.headers, accessToken);
    return this.authService.verifyAccessToken(accessToken);
  }

  @Get('getRefreshToken/:userId')
  async getRefreshToken(@Param('userId') userId: string): Promise<string> {
    return await this.authService.getRefreshToken(userId);
  }
}

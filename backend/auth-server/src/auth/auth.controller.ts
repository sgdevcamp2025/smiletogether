import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
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

  @Post('refresh')
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refreshToken']
      .replace('refreshToken=', '')
      .trim();

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found.');
    }

    const payload = await this.authService.verifyRefreshToken(refreshToken);

    const newAccessToken = await this.authService.generateAccessToken({
      userId: payload.userId,
    });

    res.setHeader('Authorization', `Bearer ${newAccessToken}`);
    return res.json({ message: 'issue AccessToken successful' });
  }

  @Get('verifyAccessToken')
  async verifyAccessToken(@Req() req: Request) {
    const accessToken = req.headers['authorization']
      .replace('Bearer ', '')
      .trim();
    return this.authService.verifyAccessToken(accessToken);
  }

  @Get('refreshtoken/:userId')
  async getRefreshToken(@Param('userId') userId: string): Promise<string> {
    return await this.authService.getRefreshToken(userId);
  }
}

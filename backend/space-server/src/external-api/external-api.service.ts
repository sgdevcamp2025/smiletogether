import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExternalApiService {
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    // 환경변수 'EXTERNAL_API_URL'이 없으면 기본값 'http://host.docker.internal:8080'을 사용
    this.baseUrl = this.configService.get<string>(
      'EXTERNAL_API_URL',
      'http://host.docker.internal:8080',
    );
  }

  async getEmailByUserId(userId: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/auth/identify-email?userId=${encodeURIComponent(userId)}`,
      );
      if (!response.ok) {
        console.log(response);
        return '해당 userId의 email이 존재하지 않습니다.';
      }
      const data = await response.json();
      return data.email || '해당 userId의 email이 존재하지 않습니다.';
    } catch (error) {
      console.error(error);
      return '해당 userId의 email이 존재하지 않습니다.';
    }
  }

  async getUserIdByEmail(email: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/auth/check-memberId?email=${encodeURIComponent(email)}`,
      );
      if (!response.ok) return '해당 email의 userId가 존재하지 않습니다.';
      const data = await response.json();
      return data.userId || '해당 email의 userId가 존재하지 않습니다.';
    } catch (error) {
      console.error(error);
      return '해당 email의 userId가 존재하지 않습니다.';
    }
  }

  async getNameByUserId(userId: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/auth/identify-user-name?userId=${userId}`,
      );
      if (!response.ok) return '해당 userId의 userName이 존재하지 않습니다.';
      const data = await response.json();
      return data.userName || '해당 userId의 userName이 존재하지 않습니다.';
    } catch (error) {
      console.error(error);
      return '해당 userId의 userName이 존재하지 않습니다.';
    }
  }
}

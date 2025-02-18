import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  findAll() {
    return `This action returns all auth`;
  }
}

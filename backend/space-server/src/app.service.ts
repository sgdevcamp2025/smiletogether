import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //commit test
    return 'Hello World!';
  }
}

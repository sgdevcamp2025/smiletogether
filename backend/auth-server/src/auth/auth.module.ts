import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6380,
      },
    }),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

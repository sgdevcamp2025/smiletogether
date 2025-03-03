import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    }),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6381,
      },
    }),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}

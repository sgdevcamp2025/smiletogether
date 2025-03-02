import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
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

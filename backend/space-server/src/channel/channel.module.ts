import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { ChannelController } from './channel.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { ChannelService } from './channel.service';
import { ExternalApiModule } from 'src/external-api/external-api.module';

@Module({
  imports: [
    ExternalApiModule,
    PrismaModule,
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ChannelController],
  providers: [ChannelService, AuthGuard],
})
export class ChannelModule {}

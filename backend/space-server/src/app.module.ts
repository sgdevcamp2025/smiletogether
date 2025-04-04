import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './workspace/workspace.module';
import { ChannelModule } from './channel/channel.module';
import { InviteModule } from './invite/invite.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WorkspaceModule,
    ChannelModule,
    InviteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

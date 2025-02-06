import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [ConfigModule.forRoot(), WorkspaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}

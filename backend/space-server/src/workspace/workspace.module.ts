import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';
import { InviteModule } from 'src/invite/invite.module';

@Module({
  imports: [
    InviteModule,
    PrismaModule,
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, AuthGuard],
})
export class WorkspaceModule {}

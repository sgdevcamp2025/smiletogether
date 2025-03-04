import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @UseGuards(AuthGuard)
  @Post('link/:workspaceId')
  async createInviteLink(
    @Param('workspaceId') workspaceId: string,
    @Body('domain') domain: string,
  ) {
    const inviteLink = await this.inviteService.generateInviteLink(
      domain,
      workspaceId,
    );
    return { inviteLink };
  }

  @UseGuards(AuthGuard)
  @Post('acceptlink/:inviteCode')
  async acceptInvite(
    @UserId() userId: string,
    @Param('inviteCode') inviteCode: string,
    @Body('userName') userName: string,
  ) {
    const result = await this.inviteService.acceptInviteLink(
      inviteCode,
      userId,
      userName,
    );
    return result;
  }
}

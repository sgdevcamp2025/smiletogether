import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
  async acceptInviteLink(
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

  @UseGuards(AuthGuard)
  @Post('email/:workspaceId')
  async createInviteEmail(
    @Param('workspaceId') workspaceId: string,
    @Body('domain') domain: string,
    @Body('inviteEmailList') inviteEmailList: string[],
  ) {
    const result = await this.inviteService.generateEmailInvites(
      domain,
      inviteEmailList,
      workspaceId,
    );
    return { inviteResults: result };
  }

  @UseGuards(AuthGuard)
  @Post('acceptemail/:inviteCode')
  async acceptInviteEmail(
    @UserId() userId: string,
    @Param('inviteCode') inviteCode: string,
    @Body('userName') userName: string,
  ) {
    const result = await this.inviteService.acceptInviteEmail(
      inviteCode,
      userId,
      userName,
    );
    return result;
  }

  @Get('getPendingInvites/:workspaceId')
  async getPendingInvites(@Param('workspaceId') workspaceId: string) {
    const result = await this.inviteService.getPendingInvites(workspaceId);
    return result;
  }

  @Get('getAllInviteData')
  async getAllInviteData() {
    const result = await this.inviteService.getAllInviteData();
    return result;
  }
}

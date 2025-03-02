import { Body, Controller, Post } from '@nestjs/common';
import { InviteService } from './invite.service';

@Controller('api/invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('generatelink')
  async createInviteLink(
    @Body() body: { domain: string; workspaceId: string },
  ) {
    const inviteLink = await this.inviteService.generateInviteLink(
      body.domain,
      body.workspaceId,
    );
    return { inviteLink };
  }
}

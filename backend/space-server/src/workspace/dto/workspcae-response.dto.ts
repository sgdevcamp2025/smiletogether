export class WorkspaceInviteResult {
  success: string[];
  failed: string[];
}

export class WorkspaceResponseDto {
  workspaceId: string;
  name: string;
  creator: string;
  defaultChannel: string;
  profileImage: string;
  inviteResults: WorkspaceInviteResult;
  createdAt: Date;
}

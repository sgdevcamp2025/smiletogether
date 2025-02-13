export class WorkspaceInviteResult {
  success: number[];
  failed: number[];
}

export class WorkspaceResponseDto {
  workspaceId: string;
  name: string;
  creator: number;
  defaultChannel: string;
  profileImage: string;
  inviteResults: WorkspaceInviteResult;
  createdAt: Date;
}

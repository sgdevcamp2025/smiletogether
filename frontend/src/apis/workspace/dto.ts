interface WorkspaceMember {
  user_id: string;
  profile_image: string;
}

interface Workspace {
  workspace_id: string;
  name: string;
  profile_image: string;
  member_count: number;
  workspace_members: WorkspaceMember[];
}

interface EmailGroup {
  email: string;
  workspaces: Workspace[];
}

export interface GetWorkSpaceResponseDto {
  userId: string;
  emails: EmailGroup[];
}

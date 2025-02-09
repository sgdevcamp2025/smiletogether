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

export interface GetUserWorkspacListeResponse {
  email: string;
  workspaces: Workspace[];
}

export interface PostNewWorkspaceRequestDto {
  workspace_name: string;
  owner_id: string;
  user_name: string;
  profile_image: string;
  invite_user_list: string[];
}

export interface PostNewWorkspaceResponseDto {
  workspaceId: string;
  name: string;
  creator: string;
  defaultChannel: string;
  profileImage: string;
  inviteResults: {
    success: string[] | null;
    failed: string[] | null;
  };
  createdAt: string;
}

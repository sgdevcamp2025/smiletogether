interface WorkspaceMember {
  user_id: string;
  profile_image: string;
  role?: 'member' | 'admin';
}

interface Workspace {
  workspace_id: string;
  name: string;
  profile_image: string;
  member_count: number;
  workspace_members: WorkspaceMember[];
}

export interface GetUserWorkspaceResponse {
  workspace_id: string;
  name: string;
  owner_id: string;
  profile_image: string;
  users: WorkspaceMember[];
  created_at: string;
  updated_at: string;
}

export interface GetUserWorkspaceListeResponse {
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

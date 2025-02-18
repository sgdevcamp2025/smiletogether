interface WorkspaceMember {
  userId: string;
  profileImage: string;
  role?: 'member' | 'admin';
}

interface Workspace {
  workspaceId: string;
  name: string;
  profileImage: string;
  memberCount: number;
  workspaceMembers: WorkspaceMember[];
}

export interface GetUserWorkspaceResponse {
  workspaceId: string;
  name: string;
  ownerId: string;
  profileImage: string;
  users: WorkspaceMember[];
  created_at: string;
  updated_at: string;
}

export interface GetUserWorkspaceListeResponse {
  email: string;
  workspaces: Workspace[];
}

export interface PostNewWorkspaceRequestDto {
  workspaceName: string;
  ownerId: string;
  username: string;
  profileImage: string;
  inviteResults: string[];
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

import { WorkspaceMember } from '@/types/user';
import { Workspace } from '@/types/workspace';

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
  userName: string;
  profileImage: string;
  inviteUserList: string[];
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

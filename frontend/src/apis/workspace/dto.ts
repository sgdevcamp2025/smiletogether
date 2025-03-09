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
  inviteEmailList: string[];
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

export interface PostWorkspaceInviteUrlRequestDto {
  workspaceId: string;
  domain: string;
}
export interface PostWorkspaceInviteUrlResponsetDto {
  inviteLink: string;
}

export interface getIsMemberOfWorkspaceByInviteLinkRequestDto {
  inviteCode: string;
  type: 'link' | 'email';
}

export interface getIsMemberOfWorkspaceByInviteLinkResponseDto {
  isWorkspaceMember: boolean;
  message: string;
  workspaceId: string;
  workspaceName?: string;
}

export interface postAcceptWorkspaceEmailInviteResponseDto {
  is_success: boolean;
  code: string;
  message: string;
  data: unknown;
  workspaceId: string;
}

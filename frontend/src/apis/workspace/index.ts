import {
  GetUserWorkspaceResponse,
  GetUserWorkspaceListeResponse,
  PostNewWorkspaceRequestDto,
  PostWorkspaceInviteUrlResponsetDto,
  PostWorkspaceInviteUrlRequestDto,
  getIsMemberOfWorkspaceByInviteLinkRequestDto,
  getIsMemberOfWorkspaceByInviteLinkResponseDto,
  postAcceptWorkspaceEmailInviteResponseDto,
} from '@/apis/workspace/dto';
import { spaceApi } from '@/lib/https';

export const postNewWorkspace = async (
  workspaceInfo: PostNewWorkspaceRequestDto
) => {
  const { data } = await spaceApi.post('/api/workspaces', workspaceInfo);
  return data;
};

export const getUserWorkspace = async (
  workspaceId: string
): Promise<GetUserWorkspaceResponse> => {
  const { data } = await spaceApi.get(`/api/workspaces/${workspaceId}`);
  return data;
};

export const getUserWorkspaces =
  async (): Promise<GetUserWorkspaceListeResponse> => {
    const { data } = await spaceApi.get('/api/workspaces');
    return data.userWorkspaces;
  };

export const postRemoveWorkspace = async (workspaceId: string) => {
  const { data } = await spaceApi.delete(`/api/workspaces/${workspaceId}`);
  return data;
};

export const postWorkspaceInviteLinkUrl = async ({
  workspaceId,
  domain,
}: PostWorkspaceInviteUrlRequestDto): Promise<PostWorkspaceInviteUrlResponsetDto> => {
  const { data } = await spaceApi.post(`/api/invite/link/${workspaceId}`, {
    domain,
  });
  return data;
};

export const postInviteWorkspace = async (
  workspaceId: string,
  emails: string[]
) => {
  const { data } = await spaceApi.post(`/api/invite/email/${workspaceId}`, {
    domain: import.meta.env.VITE_BASE_CLIENT_API_URL,
    inviteEmailList: emails,
  });
  return data;
};

export const postLeaveWorkspace = async (workspaceId: string) => {
  const { data } = await spaceApi.delete(
    `/api/workspaces/${workspaceId}/leave`
  );
  return data;
};

export const getIsMemberOfWorkspaceByInviteLink = async ({
  inviteCode,
  type,
}: getIsMemberOfWorkspaceByInviteLinkRequestDto): Promise<getIsMemberOfWorkspaceByInviteLinkResponseDto> => {
  const { data } = await spaceApi.get(
    `/api/invite/is-workspace-member/${inviteCode}?type=${type}`
  );
  return data;
};

export const postAcceptWorkspaceLinkInvite = async (
  inviteCode: string
): Promise<{ workspaceId: string }> => {
  const { data } = await spaceApi.post(`/api/invite/acceptlink/${inviteCode}`);
  return data;
};

export const postAcceptWorkspaceEmailInvite = async (
  inviteCode: string
): Promise<postAcceptWorkspaceEmailInviteResponseDto> => {
  const { data } = await spaceApi.post(`/api/invite/acceptemail/${inviteCode}`);
  return data;
};

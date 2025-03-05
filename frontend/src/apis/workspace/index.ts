import {
  GetUserWorkspaceResponse,
  GetUserWorkspaceListeResponse,
  PostNewWorkspaceRequestDto,
  PostWorkspaceInviteUrlResponsetDto,
  PostWorkspaceInviteUrlRequestDto,
  getIsMemberOfWorkspaceByInviteLinkRequestDto,
  getIsMemberOfWorkspaceByInviteLinkResponseDto,
} from '@/apis/workspace/dto';
import https from '@/lib/https';

export const postNewWorkspace = async (
  workspaceInfo: PostNewWorkspaceRequestDto
) => {
  const { data } = await https.post('/api/workspaces', workspaceInfo);
  return data;
};

export const getUserWorkspace = async (
  workspaceId: string
): Promise<GetUserWorkspaceResponse> => {
  const { data } = await https.get(`/api/workspaces/${workspaceId}`);
  return data;
};

export const getUserWorkspaces =
  async (): Promise<GetUserWorkspaceListeResponse> => {
    const { data } = await https.get('/api/workspaces');
    return data.userWorkspaces;
  };

export const postRemoveWorkspace = async (workspaceId: string) => {
  const { data } = await https.delete(`/api/workspaces/${workspaceId}`);
  return data;
};

export const postWorkspaceInviteLinkUrl = async ({
  workspaceId,
  domain,
}: PostWorkspaceInviteUrlRequestDto): Promise<PostWorkspaceInviteUrlResponsetDto> => {
  const { data } = await https.post(`/api/invite/link/${workspaceId}`, {
    domain,
  });
  return data;
};

export const postInviteWorkspace = async (
  workspaceId: string,
  emails: string[]
) => {
  const { data } = await https.post(
    `/api/workspaces/${workspaceId}/invite`,
    emails
  );
  return data;
};

export const postLeaveWorkspace = async (workspaceId: string) => {
  const { data } = await https.delete(`/api/workspaces/${workspaceId}/leave`);
  return data;
};

export const getIsMemberOfWorkspaceByInviteLink = async ({
  inviteCode,
  type,
}: getIsMemberOfWorkspaceByInviteLinkRequestDto): Promise<getIsMemberOfWorkspaceByInviteLinkResponseDto> => {
  const { data } = await https.get(
    `/api/invite/is-workspace-member/${inviteCode}?type=${type}`
  );
  return data;
};

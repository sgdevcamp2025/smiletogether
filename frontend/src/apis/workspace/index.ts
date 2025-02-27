import {
  GetUserWorkspaceResponse,
  GetUserWorkspaceListeResponse,
  PostNewWorkspaceRequestDto,
} from '@/apis/workspace/dto';
import https from '@/lib/https';

export const postNewWorkspace = async (
  workspaceInfo: PostNewWorkspaceRequestDto
) => {
  const { data } = await https.post('/workspaces', workspaceInfo);
  return data;
};

export const getUserWorkspace = async (
  workspaceId: string
): Promise<GetUserWorkspaceResponse> => {
  const { data } = await https.get(`/workspaces/${workspaceId}`);
  return data;
};

export const getUserWorkspaces =
  async (): Promise<GetUserWorkspaceListeResponse> => {
    const { data } = await https.get('/workspaces');
    return data;
  };

export const postRemoveWorkspace = async (workspaceId: string) => {
  const { data } = await https.delete(`/workspaces/${workspaceId}`);
  return data;
};

export const postInviteWorkspace = async (
  workspaceId: string,
  emails: string[]
) => {
  const { data } = await https.post(
    `/workspaces/${workspaceId}/invite`,
    emails
  );
  return data;
};

export const postLeaveWorkspace = async (workspaceId: string) => {
  const { data } = await https.post(`/workspaces/${workspaceId}/leave`);
  return data;
};

import {
  GetUserWorkspaceResponse,
  GetUserWorkspaceListeResponse,
  PostNewWorkspaceRequestDto,
} from '@/apis/workspace/dto';
import https from '@/lib/https';

export const getUserWorkspace = async (
  workspaceId: string
): Promise<GetUserWorkspaceResponse> => {
  const { data } = await https.get(`/api/workspaces/${workspaceId}`);
  return data;
};

export const getUserWorkspaces =
  async (): Promise<GetUserWorkspaceListeResponse> => {
    const { data } = await https.get('/api/workspaces');
    return data;
  };

export const postWorkspace = async (
  workspaceInfo: PostNewWorkspaceRequestDto
) => {
  const { data } = await https.post('/api/workspaces', workspaceInfo);
  return data;
};

export const inviteWorkspace = async (
  workspaceId: string,
  emails: string[]
) => {
  const { data } = await https.post(
    `/api/workspaces/${workspaceId}/invite`,
    emails
  );
  return data;
};

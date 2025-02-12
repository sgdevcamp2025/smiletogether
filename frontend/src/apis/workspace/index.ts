import {
  GetUserWorkspacListeResponse,
  PostNewWorkspaceRequestDto,
} from '@/apis/workspace/dto';
import https from '@/lib/https';

export const getUserWorkspaces =
  async (): Promise<GetUserWorkspacListeResponse> => {
    const { data } = await https.get('/api/workspaces');
    return data;
  };

export const postWorkspace = async (
  workspaceInfo: PostNewWorkspaceRequestDto
) => {
  const { data } = await https.post('/api/workspaces', workspaceInfo);
  return data;
};

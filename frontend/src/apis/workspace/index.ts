import {
  GetUserWorkspacListeResponse,
  PostNewWorkspaceRequestDto,
  PostNewWorkspaceResponseDto,
} from '@/apis/workspace/dto';
import https from '@/lib/https';

export const getWorkSpaceList =
  async (): Promise<GetUserWorkspacListeResponse> => {
    const { data } = await https.get('/api/workspaces');
    return data;
  };

export const postWorkspace = async (
  workspaceInfo: PostNewWorkspaceRequestDto
): Promise<PostNewWorkspaceResponseDto> => {
  const { data } = await https.post('/api/workspaces', workspaceInfo);
  return data;
};

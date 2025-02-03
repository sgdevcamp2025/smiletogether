import { GetWorkSpaceResponseDto } from '@/apis/workspace/dto';
import https from '@/lib/https';

export const getWorkSpaceList = async (): Promise<
  GetWorkSpaceResponseDto[]
> => {
  const { data } = await https.get('/api/workspaces');
  return data;
};

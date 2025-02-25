import { DMListResponseDto, DMResponseDto } from '@/apis/dm/dto';
import https from '@/lib/https';

export const getDMList = async (): Promise<DMListResponseDto> => {
  const { data } = await https.get('/api/dms');
  return data;
};

export const getDMMessage = async (dmId: string): Promise<DMResponseDto> => {
  const { data } = await https.get(`api/dms/${dmId}`);
  return data;
};

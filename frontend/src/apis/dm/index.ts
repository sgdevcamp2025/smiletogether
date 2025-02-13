import { DMListResponseDto } from '@/apis/dm/dto';
import https from '@/lib/https';

export const getDMList = async (): Promise<DMListResponseDto> => {
  const { data } = await https.get('/api/dms');
  return data;
};

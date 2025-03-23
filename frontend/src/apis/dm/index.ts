import { DMListResponseDto, DMResponseDto } from '@/apis/dm/dto';
import { directMessageApi } from '@/lib/https';

export const getDMList = async (): Promise<DMListResponseDto> => {
  const { data } = await directMessageApi.get('');
  return data;
};

export const getDMMessage = async (dmId: string): Promise<DMResponseDto> => {
  const { data } = await directMessageApi.get(`/${dmId}`);
  return data;
};

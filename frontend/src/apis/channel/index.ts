import https from '@/lib/https';
import { GetChannelResponse, GetMessagesResponse } from './dto';

export const getChannel = async (
  channelId: string
): Promise<GetChannelResponse> => {
  const response = await https.get(`/api/channel?channelId=${channelId}`);
  return response.data;
};

export const getMessages = async (
  channelId: string
): Promise<GetMessagesResponse> => {
  const response = await https.get(`/api/chatMessage?channelId=${channelId}`);
  return response.data;
};

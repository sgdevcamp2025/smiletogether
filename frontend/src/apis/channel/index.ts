import { getWorkspaceChannelsResponseDto } from '@/apis/channel/dto';
import https from '@/lib/https';

export const getChannel = async (channelId: string) => {
  const response = await https.get(`/api/channel?channelId=${channelId}`);
  return response.data;
};

export const getMessages = async (channelId: string) => {
  const response = await https.get(`/api/chatMessage?channelId=${channelId}`);
  return response.data;
};

export const getWorkspaceChannels = async (
  workspaceId: string
): Promise<getWorkspaceChannelsResponseDto[]> => {
  const { data } = await https.get(`/api/workspaces/${workspaceId}/channels`);
  return data;
};

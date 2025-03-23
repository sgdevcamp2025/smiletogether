import { spaceApi, chatApi } from '@/lib/clients';
import {
  getWorkspaceChannelsResponseDto,
  postWorkspaceChannelsRequestDto,
  postWorkspaceChannelsResponseDto,
} from '@/apis/channel/dto';
import { GetChannelResponse, GetMessagesResponse } from './dto';
import { getToken } from '@/lib/utils';

export const getChannel = async (
  channelId: string
): Promise<GetChannelResponse> => {
  const response = await spaceApi.get(`/api/channels/${channelId}`);
  return response.data;
};

export const getMessages = async (
  channelId: string
): Promise<GetMessagesResponse> => {
  const response = await spaceApi.get(`/chatMessage?channelId=${channelId}`);
  return response.data;
};

export const getUserJoinedWorkspaceChannels = async (
  workspaceId: string
): Promise<getWorkspaceChannelsResponseDto[]> => {
  const { data } = await spaceApi.get(
    `/api/channels/workspaces/${workspaceId}`
  );
  return data.channels;
};

export const postNewWorkspaceChannels = async ({
  workspaceId,
  name,
  isPrivate,
  emails,
}: postWorkspaceChannelsRequestDto): Promise<postWorkspaceChannelsResponseDto> => {
  const { data } = await spaceApi.post(`/api/channels`, {
    workspaceId,
    name,
    isPrivate,
    emails,
  });
  return data;
};

export const postInviteWorkspaceChannels = async (
  emails: string[],
  channels: string[]
) => {
  const { data } = await spaceApi.post(`/api/channels/invite`, {
    emails,
    channels,
  });
  return data;
};

export const leaveWorkspaceChannel = async (channelId: string) => {
  const { data } = await spaceApi.delete(`/api/channels/${channelId}/leave`);
  return data;
};

export const getChatMessages = async (
  workspaceId: string,
  channelId: string,
  lastTimeStamp: string
) => {
  const { data } = await chatApi.get(
    `/api/workspaces/${workspaceId}/channels/${channelId}/messages`,
    {
      params: { lastTimeStamp },
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

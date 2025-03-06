import { MessageType } from '@/types/chat';
import https from '@/lib/https';
import {
  getWorkspaceChannelsResponseDto,
  postWorkspaceChannelsRequestDto,
  postWorkspaceChannelsResponseDto,
} from '@/apis/channel/dto';
import { GetChannelResponse, GetMessagesResponse } from './dto';
import axios from 'axios';

export const getChannel = async (
  channelId: string
): Promise<GetChannelResponse> => {
  const response = await https.get(`api/channel?channelId=${channelId}`);
  return response.data;
};

export const getMessages = async (
  channelId: string
): Promise<GetMessagesResponse> => {
  const response = await https.get(`/chatMessage?channelId=${channelId}`);
  return response.data;
};

// export const getWorkspaceChannels = async (
//   workspaceId: string
// ): Promise<getWorkspaceChannelsResponseDto[]> => {
//   const { data } = await https.get(`/api/workspaces/${workspaceId}/channels`);
//   return data;
// };

export const getUserJoinedWorkspaceChannels = async (
  workspaceId: string
): Promise<getWorkspaceChannelsResponseDto[]> => {
  const { data } = await https.get(`/api/channels/workspaces/${workspaceId}`);
  return data.channels;
};

export const postNewWorkspaceChannels = async ({
  workspaceId,
  name,
  isPrivate,
  emails,
}: postWorkspaceChannelsRequestDto): Promise<postWorkspaceChannelsResponseDto> => {
  const { data } = await https.post(`/api/channels`, {
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
  const { data } = await https.post(`/api/channels/invite`, {
    emails,
    channels,
  });
  return data;
};

export const leaveWorkspaceChannel = async (channelId: string) => {
  const { data } = await https.delete(`/api/channels/${channelId}/leave`);
  return data;
};

export const getChatMessages = async (
  workspaceId: string,
  channelId: string,
  lastTimeStamp: string
): Promise<{ groupedMessages: Record<string, MessageType[]> }> => {
  try {
    const response = await axios.get(
      `http://localhost:8083/api/workspaces/${workspaceId}/channels/${channelId}/messages`,
      {
        params: { lastTimeStamp },
      }
    );

    if (response.data) {
      return { groupedMessages: response.data.groupedMessages || {} };
    }
  } catch (error) {
    console.error(error);
  }

  return { groupedMessages: {} };
};

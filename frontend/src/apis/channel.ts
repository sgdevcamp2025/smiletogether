import axios from 'axios';
import { getToken } from '@/lib/utils';

const CHAT_API_URL =
  import.meta.env.VITE_BASE_CHAT_API_URL || 'http://localhost:8083';

export const getChatMessages = async (
  workspaceId: string,
  channelId: string,
  lastTimeStamp: string
) => {
  const response = await axios.get(
    `${CHAT_API_URL}/api/workspaces/${workspaceId}/channels/${channelId}/messages`,
    {
      params: {
        lastTimeStamp,
      },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

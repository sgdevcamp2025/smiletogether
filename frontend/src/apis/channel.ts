import { getToken } from '@/lib/utils';
import { chatHistoryApi } from '@/lib/clients';
export const getChatMessages = async (
  workspaceId: string,
  channelId: string,
  lastTimeStamp: string
) => {
  const response = await chatHistoryApi.get(
    `/api/workspaces/${workspaceId}/channels/${channelId}/messages`,
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

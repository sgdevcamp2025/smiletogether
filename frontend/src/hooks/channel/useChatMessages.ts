import { getChatMessages } from '@/apis/channel';
import { MessageType } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';

interface ChatMessagesResponse {
  groupedMessages: Record<string, MessageType[]>;
}

const formatTimeStamp = (date = new Date()) => {
  const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const withoutZ = koreaDate.toISOString().slice(0, -1);
  const milliseconds = withoutZ.split('.')[1];
  const microseconds = milliseconds + '000';
  return withoutZ.split('.')[0] + '.' + microseconds;
};

export const useChatMessages = (
  workspaceId: string,
  channelId: string,
  lastTimeStamp: Date
) => {
  return useQuery<ChatMessagesResponse>({
    queryKey: ['chatMessages', workspaceId, channelId, lastTimeStamp],
    queryFn: async () => {
      try {
        const response = await getChatMessages(
          workspaceId,
          channelId,
          formatTimeStamp(lastTimeStamp)
        );
        return response;
      } catch (error: unknown) {
        return { groupedMessages: {} };
      }
    },
    enabled: !!workspaceId && !!channelId,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    retryDelay: 1000,
  });
};

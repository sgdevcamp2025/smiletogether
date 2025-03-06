import { getChatMessages } from '@/apis/channel';
import { MessageType } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ChatMessagesResponse {
  groupedMessages: Record<string, MessageType[]>; // 날짜별로 그룹화된 메시지
}

export const useChatMessages = (workspaceId: string, channelId: string) => {
  return useInfiniteQuery<ChatMessagesResponse>({
    queryKey: ['chatMessages', workspaceId, channelId],
    queryFn: async ({ pageParam }) =>
      getChatMessages(workspaceId, channelId, pageParam as string),

    getNextPageParam: lastPage => {
      const dates = Object.keys(lastPage.groupedMessages);
      if (dates.length === 0) return undefined;

      const oldestDate = dates[dates.length - 1];
      const oldestMessages = lastPage.groupedMessages[oldestDate];
      if (!oldestMessages.length) return undefined;

      return oldestMessages[oldestMessages.length - 1].createdAt;
    },

    initialPageParam: new Date().toISOString().replace('Z', ''),
  });
};

import { getChatMessages } from '@/apis/channel';
import { MessageType } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ChatMessagesResponse {
  groupedMessages: Record<string, MessageType[]>;
}

export const useChatMessages = (workspaceId: string, channelId: string) => {
  return useInfiniteQuery<ChatMessagesResponse>({
    queryKey: ['chatMessages', workspaceId, channelId],
    queryFn: async ({ pageParam }) =>
      getChatMessages(workspaceId, channelId, pageParam as string),

    getNextPageParam: lastPage => {
      const dates = Object.keys(lastPage.groupedMessages).sort();
      if (dates.length === 0) return undefined;

      const oldestDate = dates[0];
      const oldestMessages = lastPage.groupedMessages[oldestDate];
      if (!oldestMessages || oldestMessages.length === 0) return undefined;
      console.log(oldestMessages);
      return oldestMessages[0].createdAt;
    },

    initialPageParam: new Date(
      new Date().getTime() + 9 * 60 * 60 * 1000 + 1 * 60 * 1000
    )
      .toISOString()
      .replace('Z', ''),
  });
};

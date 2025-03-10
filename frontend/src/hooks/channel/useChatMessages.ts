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

    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || !lastPage.groupedMessages) return undefined;

      const dates = Object.keys(lastPage.groupedMessages).sort();
      if (dates.length === 0) return undefined;

      const oldestDate = dates[0];
      const oldestMessages = lastPage.groupedMessages[oldestDate];

      if (!Array.isArray(oldestMessages) || oldestMessages.length === 0)
        return undefined;

      const lastMessage = oldestMessages[oldestMessages.length - 1];

      if (
        pages.some(page =>
          Object.values(page.groupedMessages)
            .flat()
            .some(msg => msg.messageId === lastMessage.messageId)
        )
      ) {
        return undefined;
      }
      return lastMessage.createdAt;
    },
    initialPageParam: new Date(
      new Date().getTime() + 9 * 60 * 60 * 1000 + 1 * 60 * 1000
    )
      .toISOString()
      .replace('Z', ''),
  });
};

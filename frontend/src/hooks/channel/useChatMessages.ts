import { getChatMessages } from '@/apis/channel';
import { MessageType } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ChatMessagesResponse {
  messages: MessageType[];
}

export const useChatMessages = (workspaceId: string, channelId: string) => {
  return useInfiniteQuery<ChatMessagesResponse>({
    queryKey: ['chatMessages', workspaceId, channelId],
    queryFn: async ({ pageParam }) =>
      getChatMessages(workspaceId, channelId, pageParam as string),

    getNextPageParam: lastPage => {
      if (!lastPage.messages.length) return undefined;
      return lastPage.messages[0].createdAt;
    },

    initialPageParam: new Date().toISOString().replace('Z', ''),
  });
};

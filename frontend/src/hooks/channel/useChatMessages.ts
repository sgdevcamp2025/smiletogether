import { getChatMessages } from '@/apis/channel';
import { MessageType } from '@/types/chat';
import { useInfiniteQuery } from '@tanstack/react-query';

export interface ChatMessagesResponse {
  groupedMessages: Record<string, MessageType[]>;
  nextPageParam?: Date;
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
  lastTimeStamp?: Date
) => {
  return useInfiniteQuery<ChatMessagesResponse>({
    queryKey: ['chatMessages', workspaceId, channelId],
    queryFn: async ({ pageParam }) => {
      try {
        const timestamp = pageParam
          ? formatTimeStamp(pageParam as Date)
          : formatTimeStamp(lastTimeStamp || new Date());
        const response = await getChatMessages(
          workspaceId,
          channelId,
          timestamp
        );
        return {
          ...response,
          nextPageParam: new Date(timestamp),
        };
      } catch {
        // 에러 로깅이나 처리가 필요하면 여기에 추가
        return { groupedMessages: {} };
      }
    },
    initialPageParam: lastTimeStamp || new Date(),
    getNextPageParam: lastPage => lastPage.nextPageParam,
    enabled: !!workspaceId && !!channelId,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    retryDelay: 1000,
  });
};

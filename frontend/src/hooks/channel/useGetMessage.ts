import { getMessages } from '@/apis/channel';
import { useQuery } from '@tanstack/react-query';

export const useGetMessages = (channelId?: string) => {
  const query = useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => {
      if (!channelId) return Promise.reject(new Error('채널 ID가 없습니다.'));
      return getMessages(channelId);
    },
    enabled: Boolean(channelId),
  });

  return {
    messageData: query.data,
    isMessageLoading: query.isLoading,
    isMessageError: query.isError,
  };
};

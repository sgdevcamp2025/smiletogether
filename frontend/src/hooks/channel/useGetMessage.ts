import { getMessages } from '@/apis/channel';
import { useQuery } from '@tanstack/react-query';

export const useGetMessages = (channelId: string) => {
  const query = useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => getMessages(channelId),
  });

  return {
    messageData: query.data,
    isMessageLoading: query.isLoading,
    isMessageError: query.isError,
  };
};

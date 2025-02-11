import { getMessages } from '@/apis/channel';
import { useQuery } from '@tanstack/react-query';

export const useGetMessages = (channelId: string) => {
  return useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => getMessages(channelId),
  });
};

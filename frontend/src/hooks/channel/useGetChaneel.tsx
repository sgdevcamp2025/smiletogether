import { getChannel } from '@/apis/channel';
import { useQuery } from '@tanstack/react-query';

export const useGetChannel = (channelId: string) => {
  return useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => getChannel(channelId),
    enabled: !!channelId,
  });
};

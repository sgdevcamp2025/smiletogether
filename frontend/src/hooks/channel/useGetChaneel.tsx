import { getChannel } from '@/apis/channel';
import { useQuery } from '@tanstack/react-query';

export const useGetChannel = (channelId: string) => {
  const query = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => getChannel(channelId),
    enabled: !!channelId,
  });

  return {
    channelData: query.data,
    isChannelLoading: query.isLoading,
    isChannelError: query.isError,
  };
};

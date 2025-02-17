import { getChannel } from '@/apis/channel';
import { useQuery } from '@tanstack/react-query';

export const useGetChannel = (channelId?: string) => {
  const query = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => {
      if (!channelId) return Promise.reject(new Error('채널 ID가 없습니다.'));
      return getChannel(channelId);
    },
    enabled: Boolean(channelId),
  });

  return {
    channelData: query.data,
    isChannelLoading: query.isLoading,
    isChannelError: query.isError,
  };
};

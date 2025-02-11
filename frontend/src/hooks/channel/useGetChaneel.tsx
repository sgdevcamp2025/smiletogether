import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getChannel = async (channelId: string) => {
  const response = await axios.get(`/api/channel?channelId=${channelId}`);
  return response.data;
};

export const useGetChannel = (channelId: string) => {
  return useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => getChannel(channelId),
    enabled: !!channelId,
  });
};

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getMessages = async (channelId: string) => {
  const response = await axios.get(`/api/chatMessage?channelId=${channelId}`);
  return response.data;
};

export const useGetMessages = (channelId: string) => {
  return useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => getMessages(channelId),
  });
};

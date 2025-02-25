import { useQuery } from '@tanstack/react-query';
import { getDMMessage } from '@/apis/dm';

export const useGetDMMessages = (dmId: string) => {
  return useQuery({
    queryKey: ['dmMessage', dmId],
    queryFn: () => getDMMessage(dmId),
    enabled: !!dmId,
  });
};

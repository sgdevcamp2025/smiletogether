import { getDMList } from '@/apis/dm';
import { useQuery } from '@tanstack/react-query';

const useGetDMListQuery = (workspaceId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dmList', workspaceId],
    queryFn: getDMList,
  });
  return { data, isLoading, isError };
};

export default useGetDMListQuery;

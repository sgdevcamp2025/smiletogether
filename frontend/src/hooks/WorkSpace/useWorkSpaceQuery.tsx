import { getWorkSpaceList } from '@/apis/workspace';
import { useQuery } from '@tanstack/react-query';

const useWorkSpaceQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['workspace'],
    queryFn: getWorkSpaceList,
  });

  return { data, isError, isLoading };
};

export default useWorkSpaceQuery;

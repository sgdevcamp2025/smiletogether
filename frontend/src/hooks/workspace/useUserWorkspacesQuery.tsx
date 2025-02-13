import { getUserWorkspaces } from '@/apis/workspace';
import { useQuery } from '@tanstack/react-query';

const useUserWorkspacesQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['workspace'],
    queryFn: getUserWorkspaces,
  });

  return { data, isError, isLoading };
};

export default useUserWorkspacesQuery;

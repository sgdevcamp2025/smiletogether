import { getUserWorkspace } from '@/apis/workspace';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceQuery = (workspaceId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['workspace'],
    queryFn: () => getUserWorkspace(workspaceId),
  });

  return { data, isError, isLoading };
};

export default useWorkspaceQuery;

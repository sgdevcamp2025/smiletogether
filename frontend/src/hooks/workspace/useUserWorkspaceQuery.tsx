import { getUserWorkspace } from '@/apis/workspace';
import { useQuery } from '@tanstack/react-query';

const useUserWorkspaceQuery = (workspaceId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: () => getUserWorkspace(workspaceId),
    enabled: !!workspaceId,
  });

  return { data, isError, isLoading };
};

export default useUserWorkspaceQuery;

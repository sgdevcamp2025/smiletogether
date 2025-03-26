import { getUserWorkspace } from '@/apis/workspace';
import { useQuery } from '@tanstack/react-query';

const useUserWorkspaceQuery = (workspaceId: string) => {
  const {
    data: workspaceInfo,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: () => getUserWorkspace(workspaceId),
    enabled: !!workspaceId,
  });

  return {
    workspaceInfo,
    isWorkspaceLoading,
    isWorkspaceError,
  };
};

export default useUserWorkspaceQuery;

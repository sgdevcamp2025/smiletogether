import { getUserWorkspaces } from '@/apis/workspace';
import { useQuery } from '@tanstack/react-query';

const useUserWorkspacesQuery = () => {
  const {
    data: workspacesInfo,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useQuery({
    queryKey: ['workspaces'],
    queryFn: getUserWorkspaces,
  });

  return { workspacesInfo, isWorkspacesLoading, isWorkspacesError };
};

export default useUserWorkspacesQuery;

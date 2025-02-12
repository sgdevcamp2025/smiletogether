import { getWorkspaceChannels } from '@/apis/channel';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceChannelListQuery = (workspaceId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['channels', workspaceId],
    queryFn: () => getWorkspaceChannels(workspaceId),
  });
  return { data, isLoading, isError };
};

export default useWorkspaceChannelListQuery;

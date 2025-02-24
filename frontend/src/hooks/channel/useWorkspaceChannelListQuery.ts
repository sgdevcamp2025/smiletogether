import { getWorkspaceChannels } from '@/apis/channel';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceChannelListQuery = (workspaceId: string) => {
  const {
    data: channelList,
    isLoading: isChannelLoading,
    isError: isChannelError,
  } = useQuery({
    queryKey: ['channels', workspaceId],
    queryFn: () => getWorkspaceChannels(workspaceId),
    enabled: !!workspaceId,
  });
  return { channelList, isChannelLoading, isChannelError };
};

export default useWorkspaceChannelListQuery;

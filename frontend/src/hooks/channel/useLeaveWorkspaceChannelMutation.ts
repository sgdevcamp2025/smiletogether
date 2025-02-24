import { leaveWorkspaceChannel } from '@/apis/channel';
import { useMutation } from '@tanstack/react-query';

const useLeaveWorkspaceChannelMutation = () => {
  return useMutation({
    mutationFn: ({
      workspaceId,
      channelId,
    }: {
      workspaceId: string;
      channelId: string;
    }) => leaveWorkspaceChannel(workspaceId, channelId),
  });
};

export default useLeaveWorkspaceChannelMutation;

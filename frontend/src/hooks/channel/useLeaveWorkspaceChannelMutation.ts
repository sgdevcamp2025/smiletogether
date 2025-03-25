import { leaveWorkspaceChannel } from '@/apis/channel';
import { useMutation } from '@tanstack/react-query';

const useLeaveWorkspaceChannelMutation = () => {
  return useMutation({
    mutationFn: ({ channelId }: { channelId: string }) =>
      leaveWorkspaceChannel(channelId),
  });
};

export default useLeaveWorkspaceChannelMutation;

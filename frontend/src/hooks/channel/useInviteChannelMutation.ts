import { postInviteWorkspaceChannels } from '@/apis/channel';
import { useMutation } from '@tanstack/react-query';

const useInviteChannelMutation = () => {
  return useMutation({
    mutationKey: ['inviteWorkspace'],
    mutationFn: ({
      workspaceId,
      emails,
      channels,
    }: {
      workspaceId: string;
      emails: string[];
      channels: string[];
    }) => postInviteWorkspaceChannels(workspaceId, emails, channels),
  });
};

export default useInviteChannelMutation;

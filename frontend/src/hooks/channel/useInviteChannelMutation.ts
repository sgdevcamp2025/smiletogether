import { postInviteWorkspaceChannels } from '@/apis/channel';
import { useMutation } from '@tanstack/react-query';

const useInviteChannelMutation = () => {
  return useMutation({
    mutationKey: ['inviteWorkspace'],
    mutationFn: ({
      emails,
      channels,
    }: {
      emails: string[];
      channels: string[];
    }) => postInviteWorkspaceChannels(emails, channels),
  });
};

export default useInviteChannelMutation;

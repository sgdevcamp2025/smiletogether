import { postNewWorkspaceChannels } from '@/apis/channel';
import { useMutation } from '@tanstack/react-query';

const useCreateChannelMutation = (workspaceId: string) => {
  return useMutation({
    mutationKey: ['createChannel', workspaceId],
    mutationFn: postNewWorkspaceChannels,
  });
};

export default useCreateChannelMutation;

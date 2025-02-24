import { postNewWorkspaceChannels } from '@/apis/channel';
import { useMutation } from '@tanstack/react-query';

const useCreateChannelMutation = (workspaceId: string) => {
  const { mutate: createChannel, ...rest } = useMutation({
    mutationKey: ['createChannel', workspaceId],
    mutationFn: postNewWorkspaceChannels,
  });
  return { createChannel, ...rest };
};

export default useCreateChannelMutation;

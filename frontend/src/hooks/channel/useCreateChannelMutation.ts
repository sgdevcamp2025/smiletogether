import { postNewWorkspaceChannels } from '@/apis/channel';
import { useMutation } from '@tanstack/react-query';

const useCreateChannelMutation = () => {
  const { mutate: createChannel, ...rest } = useMutation({
    mutationFn: postNewWorkspaceChannels,
  });
  return { createChannel, ...rest };
};

export default useCreateChannelMutation;

import { postNewWorkspaceChannels } from '@/apis/channel';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateChannelMutation = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const { mutate: createChannel, ...rest } = useMutation({
    mutationFn: postNewWorkspaceChannels,
    onSuccess: () => {
      alert(`채널 생성에 하셨습니다.`);

      queryClient.invalidateQueries({
        queryKey: ['channels', workspaceId],
      });
    },
    onError: () => {
      alert(`채널 생성에 실패하였습니다. `);
    },
  });
  return { createChannel, ...rest };
};

export default useCreateChannelMutation;

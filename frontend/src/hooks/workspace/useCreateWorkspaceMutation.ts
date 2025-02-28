import { postNewWorkspace } from '@/apis/workspace';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: createWorkspace, ...rest } = useMutation({
    mutationKey: ['makeworkspace'],
    mutationFn: postNewWorkspace,
    onSuccess: () => {
      alert('성공');
      queryClient.invalidateQueries({
        queryKey: ['workspaces'],
      });
    },
  });

  return { createWorkspace, ...rest };
};

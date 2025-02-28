import { postNewWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

export const useCreateWorkspaceMutation = () => {
  const { mutate: createWorkspace, ...rest } = useMutation({
    mutationKey: ['makeworkspace'],
    mutationFn: postNewWorkspace,
    onSuccess: () => {
      alert('성공');
    },
  });

  return { createWorkspace, ...rest };
};

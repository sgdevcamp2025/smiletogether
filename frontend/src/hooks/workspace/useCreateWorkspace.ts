import { postWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

export const useCreateWorkspace = () => {
  const { mutate: createWorkspace, ...rest } = useMutation({
    mutationKey: ['makeworkspace'],
    mutationFn: postWorkspace,
    onSuccess: () => {
      alert('성공');
    },
  });

  return { createWorkspace, ...rest };
};

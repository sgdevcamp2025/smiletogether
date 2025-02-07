import { postWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

export const useCreateWorkspace = () => {
  return useMutation({
    mutationKey: ['makeworkspace'],
    mutationFn: postWorkspace,
    onSuccess: () => {
      alert('성공');
    },
  });
};

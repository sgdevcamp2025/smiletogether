import { removeWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useRemoveWorkspaceMutation = () => {
  return useMutation({
    mutationFn: (workpspaceId: string) => removeWorkspace(workpspaceId),
  });
};

export default useRemoveWorkspaceMutation;

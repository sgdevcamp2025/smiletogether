import { leaveWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useLeaveWorkspaceMutation = () => {
  return useMutation({
    mutationFn: (workpspaceId: string) => leaveWorkspace(workpspaceId),
  });
};

export default useLeaveWorkspaceMutation;

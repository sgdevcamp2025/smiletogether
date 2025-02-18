import { leaveWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useLeaveWorkspaceMutation = () => {
  return useMutation({
    mutationFn: (workpspaceId: string) => leaveWorkspace(workpspaceId),
    onSuccess: () => {
      alert('성공적으로 나가졌습니다.');
    },
    onError: () => {
      alert('워크스페이스 나가기 에러');
    },
  });
};

export default useLeaveWorkspaceMutation;

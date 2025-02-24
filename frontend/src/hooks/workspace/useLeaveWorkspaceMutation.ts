import { postLeaveWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useLeaveWorkspaceMutation = () => {
  const { mutate: leaveWorkspace, ...rest } = useMutation({
    mutationFn: (workpspaceId: string) => postLeaveWorkspace(workpspaceId),
    onSuccess: () => {
      alert('성공적으로 나가졌습니다.');
    },
    onError: () => {
      alert('워크스페이스 나가기 에러');
    },
  });

  return { leaveWorkspace, ...rest };
};

export default useLeaveWorkspaceMutation;

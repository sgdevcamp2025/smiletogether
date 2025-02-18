import { removeWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useRemoveWorkspaceMutation = () => {
  return useMutation({
    mutationFn: (workpspaceId: string) => removeWorkspace(workpspaceId),
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
    },
    onError: () => {
      alert('워크스페이스 삭제 에러');
    },
  });
};

export default useRemoveWorkspaceMutation;

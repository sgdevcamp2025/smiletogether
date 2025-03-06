import { postRemoveWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useRemoveWorkspaceMutation = () => {
  const { mutate: removeWorkspace, ...rest } = useMutation({
    mutationFn: (workpspaceId: string) => postRemoveWorkspace(workpspaceId),
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
    },
    onError: () => {
      alert('워크스페이스 삭제 에러');
    },
  });
  return { removeWorkspace, ...rest };
};

export default useRemoveWorkspaceMutation;

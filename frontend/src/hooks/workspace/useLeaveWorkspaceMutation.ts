import { postLeaveWorkspace, getUserWorkspaces } from '@/apis/workspace';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const useLeaveWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: leaveWorkspace, ...rest } = useMutation({
    mutationFn: (workpspaceId: string) => postLeaveWorkspace(workpspaceId),
    onSuccess: async () => {
      alert('성공적으로 나가졌습니다.');
      queryClient.invalidateQueries({
        queryKey: ['workspaces'],
      });
      const updateWorkspaces = await queryClient.fetchQuery({
        queryKey: ['workspaces'],
        queryFn: getUserWorkspaces,
      });
      if (updateWorkspaces.workspaces.length > 0) {
        navigate(`/workspace/${updateWorkspaces.workspaces[0].workspaceId}`);
      } else {
        navigate('/workspaces');
      }
    },
    onError: () => {
      alert('워크스페이스 나가기 에러');
    },
  });

  return { leaveWorkspace, ...rest };
};

export default useLeaveWorkspaceMutation;

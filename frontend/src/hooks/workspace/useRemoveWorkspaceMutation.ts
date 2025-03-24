import { getUserJoinedWorkspaceChannels } from '@/apis/channel';
import { getUserWorkspaces, postRemoveWorkspace } from '@/apis/workspace';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const useRemoveWorkspaceMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: removeWorkspace, ...rest } = useMutation({
    mutationFn: (workpspaceId: string) => postRemoveWorkspace(workpspaceId),
    onSuccess: async () => {
      alert('성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['workspaces'],
      });
      const updateWorkspaces = await queryClient.fetchQuery({
        queryKey: ['workspaces'],
        queryFn: getUserWorkspaces,
      });
      const firstRemainsWorkspaceId =
        updateWorkspaces.workspaces[0].workspaceId;
      if (updateWorkspaces.workspaces.length > 0) {
        const getWorkspaceChannel = await getUserJoinedWorkspaceChannels(
          firstRemainsWorkspaceId
        );
        navigate(
          `/workspace/${firstRemainsWorkspaceId}/channel/${getWorkspaceChannel[0].channelId}`
        );
      } else {
        navigate('/workspaces');
      }
    },
    onError: () => {
      alert('워크스페이스 삭제 에러');
    },
  });
  return { removeWorkspace, ...rest };
};

export default useRemoveWorkspaceMutation;

import { postInviteWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useInviteWorkspaceMutation = () => {
  const { mutate: inviteWorkspace, ...rest } = useMutation({
    mutationKey: ['inviteWorkspace'],
    mutationFn: ({
      workspaceId,
      emails,
    }: {
      workspaceId: string;
      emails: string[];
    }) => postInviteWorkspace(workspaceId, emails),
  });
  return { inviteWorkspace, ...rest };
};

export default useInviteWorkspaceMutation;

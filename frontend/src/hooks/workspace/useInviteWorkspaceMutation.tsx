import { inviteWorkspace } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useInviteWorkspaceMutation = () => {
  return useMutation({
    mutationKey: ['inviteWorkspace'],
    mutationFn: ({
      workspaceId,
      emails,
    }: {
      workspaceId: string;
      emails: string[];
    }) => inviteWorkspace(workspaceId, emails),
  });
};

export default useInviteWorkspaceMutation;

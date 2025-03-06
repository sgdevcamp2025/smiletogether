import { postWorkspaceInviteLinkUrl } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useWorkspaceInviteLinkUrlMutation = () => {
  return useMutation({
    mutationFn: postWorkspaceInviteLinkUrl,
  });
};

export default useWorkspaceInviteLinkUrlMutation;

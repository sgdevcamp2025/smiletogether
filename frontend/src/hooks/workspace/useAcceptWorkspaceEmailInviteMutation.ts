import { postAcceptWorkspaceEmailInvite } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useAcceptWorkspaceEmailInviteMutation = () => {
  const { mutate: acceptEmailInvite, isError: acceptEmailInviteError } =
    useMutation({
      mutationFn: postAcceptWorkspaceEmailInvite,
    });
  return { acceptEmailInvite, acceptEmailInviteError };
};

export default useAcceptWorkspaceEmailInviteMutation;

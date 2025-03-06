import { postAcceptWorkspaceLinkInvite } from '@/apis/workspace';
import { useMutation } from '@tanstack/react-query';

const useAcceptWorkspaceLinkInviteMutation = () => {
  const { mutate: acceptLinkInvite, isError: acceptLinkInviteError } =
    useMutation({
      mutationFn: postAcceptWorkspaceLinkInvite,
    });
  return { acceptLinkInvite, acceptLinkInviteError };
};

export default useAcceptWorkspaceLinkInviteMutation;

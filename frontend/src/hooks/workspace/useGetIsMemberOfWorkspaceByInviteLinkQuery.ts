import { getIsMemberOfWorkspaceByInviteLink } from '@/apis/workspace';
import { useQuery } from '@tanstack/react-query';

const useGetIsMemberOfWorkspaceByInviteLinkQuery = (
  inviteCode: string,
  type: 'link' | 'email'
) => {
  return useQuery({
    queryKey: ['checkUserIsWorkspaceMember', inviteCode, type],
    queryFn: () => getIsMemberOfWorkspaceByInviteLink(inviteCode, type),
  });
};

export default useGetIsMemberOfWorkspaceByInviteLinkQuery;

import useGetIsMemberOfWorkspaceByInviteLinkQuery from '@/hooks/workspace/useGetIsMemberOfWorkspaceByInviteLinkQuery';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const WorkspaceJoinPage = () => {
  const isValidUser = localStorage.getItem('access-token');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteType = searchParams.get('type');
  const inviteCode = searchParams.get('code');

  useEffect(() => {
    if (
      !inviteCode ||
      !inviteType ||
      (inviteType !== 'link' && inviteType !== 'email')
    ) {
      navigate('/');
    }
  }, [inviteCode, inviteType]);

  const { data, isLoading, isError } =
    useGetIsMemberOfWorkspaceByInviteLinkQuery(
      inviteCode!,
      inviteType as 'email' | 'link'
    );

  useEffect(() => {
    if (!isValidUser) {
      navigate('/');
    }
  }, [isValidUser, navigate]);

  useEffect(() => {
    if (data) {
      navigate(`/workspace/${inviteCode}`);
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>isError</div>;
  }
  return <div>참여 필요</div>;
};

export default WorkspaceJoinPage;

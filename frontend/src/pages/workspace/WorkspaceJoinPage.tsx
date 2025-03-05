import useGetIsMemberOfWorkspaceByInviteLinkQuery from '@/hooks/workspace/useGetIsMemberOfWorkspaceByInviteLinkQuery';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const WorkspaceJoinPage = () => {
  const isValidUser = localStorage.getItem('access-token');
  const navigate = useNavigate();
  const inviteType = window.location.pathname.split('/')[2] as 'email' | 'link';
  const inviteCode = window.location.pathname.split('/')[3];
  const inviteWorkspaceId = window.location.pathname.split('/')[4];

  const { data, isLoading, isError } =
    useGetIsMemberOfWorkspaceByInviteLinkQuery(inviteCode, inviteType);

  useEffect(() => {
    if (!isValidUser) {
      navigate('/');
    }
  }, [isValidUser, navigate]);

  useEffect(() => {
    if (!inviteCode || !inviteType || inviteWorkspaceId) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (data) {
      navigate(`/workspace/${data}`);
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

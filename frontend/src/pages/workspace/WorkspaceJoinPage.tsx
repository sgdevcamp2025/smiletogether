import { Input } from '@/components/ui/input';
import useGetIsMemberOfWorkspaceByInviteLinkQuery from '@/hooks/workspace/useGetIsMemberOfWorkspaceByInviteLinkQuery';
import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import React from 'react';
import useAcceptWorkspaceEmailInviteMutation from '@/hooks/workspace/useAcceptWorkspaceEmailInviteMutation';
import useAcceptWorkspaceLinkInviteMutation from '@/hooks/workspace/useAcceptWorkspaceLinkInviteMutation';
import { getUserJoinedWorkspaceChannels } from '@/apis/channel';
import { getIsMemberOfWorkspaceByInviteLinkResponseDto } from '@/apis/workspace/dto';

const WorkspaceJoinPage = () => {
  const isValidUser = localStorage.getItem('access-token');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteType = searchParams.get('type');
  const inviteCode = searchParams.get('code');
  const [username, setUserName] = useState('');
  const { acceptEmailInvite } = useAcceptWorkspaceEmailInviteMutation();
  const { acceptLinkInvite } = useAcceptWorkspaceLinkInviteMutation();

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
    const fetchData = async (
      data: getIsMemberOfWorkspaceByInviteLinkResponseDto
    ) => {
      const response = await getUserJoinedWorkspaceChannels(data.workspaceId);
      navigate(
        `/workspace/${data.workspaceId}/channel/${response[0].channelId}`
      );
    };
    if (!data) return;
    if (data.isWorkspaceMember) {
      fetchData(data);
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>isError</div>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleInputEnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!username) {
        alert('사용하실 이름을 작성해주세요');
        return;
      }
      if (inviteType === 'email')
        acceptEmailInvite(inviteCode!, {
          onSuccess: data => {
            navigate(`/workspace/${data.workspaceId}`);
          },
          onError: () => {
            alert('일시적인 오류가 발생했습니다.');
            navigate('/');
          },
        });
      else
        acceptLinkInvite(inviteCode!, {
          onSuccess: data => {
            navigate(`/workspace/${data.workspaceId}`);
          },
          onError: () => {
            alert('일시적인 오류가 발생했습니다.');
            navigate('/');
          },
        });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-20 flex-col">
      <h1 className="text-4xl py-6">
        <span className="text-violet-500">
          {(data && data?.workspaceName) ?? 'workspace'}
        </span>
        팀에 참여
      </h1>
      <p>
        어떤 규모의 조직이라도 smiletogether을 통해 업무를 처리할 수 있습니다.
      </p>
      <Input
        className="max-w-sm mt-8"
        placeholder="워크스페이스에서 사용할 이름을 작성해주세요"
        value={username}
        onChange={handleInputChange}
        onKeyDown={handleInputEnterSubmit}
      />
    </div>
  );
};

export default WorkspaceJoinPage;

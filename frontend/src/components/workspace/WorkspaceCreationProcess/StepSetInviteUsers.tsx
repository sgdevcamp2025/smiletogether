import { useState } from 'react';
import { useNavigate } from 'react-router';
import { IoIosLink } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '@/hooks/workspace/useCreateWorkspace';
import { useWorkspaceCreationStore } from '@/stores/workspace';
import EmailTagInput from '@/components/common/EmailTagInput';

const StepSetInviteUsers = () => {
  const {
    workspaceName,
    userName,
    workspaceProfileImage,
    invitedUsers,
    setInvitedUsers,
    initWorkspaceStore,
  } = useWorkspaceCreationStore();
  const [validEmail, setValidEmail] = useState(false);
  const { createWorkspace } = useCreateWorkspace();
  const navigate = useNavigate();

  const submitWorkspaceInfo = () => {
    alert('제출 완료');
    createWorkspace(
      {
        workspaceName: workspaceName,
        ownerId: '03c6b083-e8d6-488c-aa83-2a01b3f39d00',
        userName: userName,
        profileImage: workspaceProfileImage,
        inviteUserList: invitedUsers,
      },
      {
        onSuccess: data => {
          navigate(`/workspace/${data.workspaceId}`);
          initWorkspaceStore();
        },
      }
    );
  };

  return (
    <div className="w-1000px">
      <EmailTagInput
        emails={invitedUsers}
        setEmails={setInvitedUsers}
        setIsValidEmail={setValidEmail}
        className="w-400"
      />
      {validEmail && <p>올바르지 않은 이메일 형식입니다.</p>}
      <div className=" mt-6 flex  gap-4">
        <Button
          onClick={submitWorkspaceInfo}
          disabled={!(invitedUsers.length > 0)}
          className="px-8"
        >
          다음
        </Button>
        <Button className="bg-white text-black hover:bg-gray-200 shadow-none bordeor border-2 border-gray-200">
          <IoIosLink />
          <span>초대 링크 복사</span>
        </Button>
        <Button
          className="bg-white text-gray-400 border-none shadow-none hover:bg-white"
          onClick={submitWorkspaceInfo}
        >
          이 단계 건너 뛰기
        </Button>
      </div>
    </div>
  );
};

export default StepSetInviteUsers;

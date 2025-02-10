import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { IoIosLink } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '@/hooks/WorkSpace/useCreateWorkspace';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';
import { isValidEmail } from '@/lib/utils';

const StepSetInviteUsers = () => {
  const {
    workspaceName,
    userName,
    workspaceProfileImage,
    invitedUsers,
    setInvitedUsers,
    initWorkspaceStore,
  } = useWorkspaceCreationStore();
  const [emailInput, setEmailInput] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const { mutate } = useCreateWorkspace();
  const navigate = useNavigate();

  const removeLastTagOnBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && emailInput === '') {
      if (!pendingDelete) {
        setPendingDelete(true);
        return;
      }
      setInvitedUsers(invitedUsers.slice(0, -1));
      setPendingDelete(false);
    } else {
      setPendingDelete(false);
    }
  };

  const addEmailOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isValidEmail(emailInput)) {
        setValidEmail(true);
        return;
      }

      if (emailInput !== '' && !invitedUsers.includes(emailInput)) {
        setInvitedUsers([...invitedUsers, emailInput]);
        setEmailInput('');
        setValidEmail(false);
      }
    }
  };

  const removeTags = (tag: string) => {
    setInvitedUsers(invitedUsers.filter(item => item !== tag));
  };

  const submitWorkspaceInfo = () => {
    alert('제출 완료');
    mutate(
      {
        workspace_name: workspaceName,
        owner_id: '1',
        user_name: userName,
        profile_image: workspaceProfileImage,
        invite_user_list: invitedUsers,
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
    <div>
      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2 p-4 border rounded-md overflow-y-auto max-w-xl">
          {invitedUsers.map(tag => {
            return (
              <div className="flex items-center px-2  bg-blue-100 rounded-md text-sm ">
                <span className="flex items-center px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
                <span
                  onClick={() => {
                    removeTags(tag);
                  }}
                  className="text-lg"
                >
                  x
                </span>
              </div>
            );
          })}
          <input
            className="flex-1 border-none outline-none focus:border-none focus-visible:outline-none focus:ring-0"
            onKeyUp={e => {
              removeLastTagOnBackspace(e);
              addEmailOnEnter(e);
            }}
            placeholder={
              invitedUsers.length > 0
                ? ''
                : '예: elis@naver.com, maria@naver.com'
            }
            value={emailInput}
            onChange={e => {
              setEmailInput(e.target.value);
            }}
          />
        </div>
      </div>
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

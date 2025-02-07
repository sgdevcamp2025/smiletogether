import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';
import { isValidEmail } from '@/lib/utils';
import { IoIosLink } from 'react-icons/io';

const StepSetInviteUsers = () => {
  const { initWorkspaceStore, invitedUsers, setInvitedUsers } =
    useWorkspaceCreationStore();
  const [validEmail, setValidEmail] = useState(false);

  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    if (e.keyCode === 13 && !isValidEmail(inputValue)) {
      setValidEmail(true);
      return;
    }

    if (e.keyCode === 8 && invitedUsers.length > 0) {
      setInvitedUsers(invitedUsers.slice(0, -1));
    }
    if (
      e.keyCode === 13 &&
      inputValue !== '' &&
      !invitedUsers.includes(inputValue)
    ) {
      setInvitedUsers([...invitedUsers, inputValue]);
      e.currentTarget.value = '';
      setValidEmail(false);
    }
  };

  const removeTags = (tag: string) => {
    setInvitedUsers(invitedUsers.filter(item => item !== tag));
  };

  const submitWorkspaceInfo = () => {
    initWorkspaceStore();
    alert('제출 완료');
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
              addTags(e);
            }}
            placeholder={
              invitedUsers.length > 0
                ? ''
                : '예: elis@naver.com, maria@naver.com'
            }
          />
        </div>
      </div>
      {validEmail && <div>올바르지 않은 이메일 형식입니다.</div>}
      <div className=" mt-6 flex  gap-4">
        <Button
          onClick={() => {
            submitWorkspaceInfo();
          }}
          disabled={!(invitedUsers.length > 0)}
          className="px-8"
        >
          다음
        </Button>
        <Button className="bg-white text-black hover:bg-gray-200 shadow-none bordeor border-2 border-gray-200">
          <IoIosLink />
          <span>초대 링크 복사</span>
        </Button>
        <Button className="bg-white text-gray-400 border-none shadow-none hover:bg-white">
          이 단계 건너 뛰기
        </Button>
      </div>
    </div>
  );
};

export default StepSetInviteUsers;

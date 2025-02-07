import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';
import { isValidEmail } from '@/lib/utils';
import { IoIosLink } from 'react-icons/io';

const StepSetInviteUsers = () => {
  const { initWorkspaceStore, invitedUsers, setInvitedUsers } =
    useWorkspaceCreationStore();
  const [validEmail, setValidEmail] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Backspace' &&
      invitedUsers.length > 0 &&
      inputValue.length > 0
    ) {
      setInvitedUsers(invitedUsers.slice(0, -1));
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isValidEmail(inputValue)) {
        setValidEmail(true);
        return;
      }

      if (inputValue !== '' && !invitedUsers.includes(inputValue)) {
        setInvitedUsers([...invitedUsers, inputValue]);
        setInputValue('');
        setValidEmail(false);
      }
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
              handleBackspace(e);
              handleEnterPress(e);
            }}
            placeholder={
              invitedUsers.length > 0
                ? ''
                : '예: elis@naver.com, maria@naver.com'
            }
            onChange={e => {
              setInputValue(e.target.value);
            }}
          />
        </div>
      </div>
      {validEmail && <div>올바르지 않은 이메일 형식입니다.</div>}
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
        <Button className="bg-white text-gray-400 border-none shadow-none hover:bg-white">
          이 단계 건너 뛰기
        </Button>
      </div>
    </div>
  );
};

export default StepSetInviteUsers;

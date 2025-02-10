import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import WorkspaceNextButton from '@/components/workspace/WorkspaceNextButton';
import { isValidKoreanEnglish } from '@/lib/utils';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';
import React, { useState } from 'react';
import useProfileImageRef from '@/hooks/WorkSpace/useProfileImageRef';
import WorkspaceProfileModal from '@/components/workspace/WorkspaceProfileModal';

const StepSetUserName = () => {
  const { step, setStep, setUserName } = useWorkspaceCreationStore();
  const [userNameInput, setUserNameInput] = useState<string>('');
  const [isInvalidName, setIsInvalidName] = useState(false);
  const { imgFile, saveImg, imgRef } = useProfileImageRef();
  const [profileModal, setProfileModal] = useState(false);

  const submitUserName = () => {
    const trimmedValue = userNameInput.trim();
    if (trimmedValue === '') {
      return;
    }
    if (!isValidKoreanEnglish(trimmedValue)) {
      setIsInvalidName(true);
      return;
    }
    setUserName(trimmedValue);
    setStep(step + 1);
  };

  const onPorofileModal = () => {
    setProfileModal(true);
  };
  const offPorifileModal = () => {
    setProfileModal(false);
  };

  const handleImageUpload = () => {
    saveImg();
    setProfileModal(true);
  };

  return (
    <div>
      <div className="mt-6">
        <WorkspaceCreationInput
          value={userNameInput}
          onChange={e => {
            setUserNameInput(e.target.value);
            setIsInvalidName(false);
          }}
        />
      </div>
      {isInvalidName && <div>정확한 한글 또는 영어로 입력해주세요</div>}
      <div className="pt-6">
        <span className="font-bold">내 프로필 사진</span>
        <span className="text-gray-400">(옵션)</span>
      </div>

      <input
        type="file"
        accept="image/*"
        id="profileImg"
        onChange={handleImageUpload}
        ref={imgRef}
      />

      <div className="mt-6">
        <WorkspaceNextButton onClick={submitUserName}>다음</WorkspaceNextButton>
      </div>
      {profileModal && (
        <WorkspaceProfileModal imgFile={imgFile} onClose={offPorifileModal} />
      )}
    </div>
  );
};

export default StepSetUserName;

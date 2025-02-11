import { useState } from 'react';
import useProfileImageRef from '@/hooks/workspace/useProfileImageRef';
import { Button } from '@/components/ui/button';
import { IoPersonSharp } from 'react-icons/io5';
import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import WorkspaceNextButton from '@/components/workspace/WorkspaceNextButton';
import WorkspaceProfileModal from '@/components/workspace/WorkspaceProfileModal';
import { isValidKoreanEnglish } from '@/lib/utils';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';
const StepSetUserName = () => {
  const { step, setStep, setUserName } = useWorkspaceCreationStore();
  const [userNameInput, setUserNameInput] = useState('');
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
      {isInvalidName && <p>정확한 한글 또는 영어로 입력해주세요</p>}
      <div className="pt-6">
        <span className="font-bold">내 프로필 사진</span>
        <span className="text-gray-400">(옵션)</span>
      </div>

      <Button
        onClick={() => {
          imgRef.current?.click();
        }}
        className="bg-white text-black mt-2 shadow-none border-2 hover:bg-yellow-300"
      >
        <IoPersonSharp />
        <span>사진 업로드</span>
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={handleImageUpload}
          ref={imgRef}
          className="hidden"
        />
      </Button>

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

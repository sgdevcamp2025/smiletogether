import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import WorkspaceNextButton from '@/components/workspace/WorkspaceNextButton';
import { isValidKoreanEnglish } from '@/lib/utils';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';
import { useState } from 'react';

const StepSetUserName = () => {
  const { step, setStep, setUserName } = useWorkspaceCreationStore();
  const [userNameInput, setUserNameInput] = useState<string>('');
  const [isInvalidName, setIsInvalidName] = useState(false);

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
      <div className="mt-6">
        <WorkspaceNextButton onClick={submitUserName}>다음</WorkspaceNextButton>
      </div>
    </div>
  );
};

export default StepSetUserName;

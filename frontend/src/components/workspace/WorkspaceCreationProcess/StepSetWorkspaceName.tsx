import { useState } from 'react';
import { isValidKoreanEnglish } from '@/lib/utils';
import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import WorkspaceNextButton from '@/components/workspace/WorkspaceNextButton';
import { useWorkspaceCreationStore } from '@/stores/workspace';

const StepSetWorkspaceName = () => {
  const { step, setStep, setWorkspaceName } = useWorkspaceCreationStore();
  const [workspaceNameInput, setWorkspaceNameInput] = useState<string>('');
  const [isInvalidName, setIsInvalidName] = useState(false);

  const submitWorkspaceName = () => {
    const trimmedValue = workspaceNameInput.trim();
    if (trimmedValue === '') {
      return;
    }
    if (!isValidKoreanEnglish(trimmedValue)) {
      setIsInvalidName(true);
      return;
    }
    setWorkspaceName(trimmedValue);
    setStep(step + 1);
  };

  return (
    <div>
      <div className="mt-6">
        <WorkspaceCreationInput
          value={workspaceNameInput}
          onChange={e => {
            setWorkspaceNameInput(e.target.value);
            setIsInvalidName(false);
          }}
          placeholder="예: Acme 마케틸 또는 Acme"
        />
      </div>
      {isInvalidName && <p>정확한 한글 또는 영어로 입력해주세요</p>}
      <div className="mt-6">
        <WorkspaceNextButton onClick={submitWorkspaceName}>
          다음
        </WorkspaceNextButton>
      </div>
    </div>
  );
};

export default StepSetWorkspaceName;

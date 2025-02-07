import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import WorkspaceNextButton from '@/components/workspace/WorkspaceNextButton';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';

const StepSetUserName = () => {
  const { step, setStep, userName, setUserName } = useWorkspaceCreationStore();

  return (
    <div>
      <div className="mt-6">
        <WorkspaceCreationInput
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className="mt-6">
        <WorkspaceNextButton
          onClick={() => {
            setStep(step + 1);
          }}
        >
          다음
        </WorkspaceNextButton>
      </div>
    </div>
  );
};

export default StepSetUserName;

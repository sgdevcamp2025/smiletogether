import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import WorkspaceNextButton from '@/components/workspace/WorkspaceNextButton';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';

const StepSetWorkspaceName = () => {
  const { step, setStep, workspaceName, setWorkspaceName } =
    useWorkspaceCreationStore();
  return (
    <div>
      <div className="mt-6">
        <WorkspaceCreationInput
          value={workspaceName}
          onChange={e => {
            setWorkspaceName(e.target.value);
          }}
          placeholder="예: Acme 마케틸 또는 Acme"
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

export default StepSetWorkspaceName;

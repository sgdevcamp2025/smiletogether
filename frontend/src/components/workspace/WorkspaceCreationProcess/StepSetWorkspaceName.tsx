import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';

const StepSetWorkspaceName = () => {
  const { step, setStep, workspaceName, setWorkspaceName } =
    useWorkspaceCreationStore();
  return (
    <div>
      <WorkspaceCreationInput
        value={workspaceName}
        onChange={e => {
          setWorkspaceName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setStep(step + 1);
        }}
      >
        다음
      </button>
    </div>
  );
};

export default StepSetWorkspaceName;

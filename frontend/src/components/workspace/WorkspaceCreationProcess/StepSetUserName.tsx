import { Button } from '@/components/ui/button';
import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';

const StepSetUserName = () => {
  const { step, setStep, userName, setUserName } = useWorkspaceCreationStore();
  return (
    <div>
      <WorkspaceCreationInput
        value={userName}
        onChange={e => {
          setUserName(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          setStep(step + 1);
        }}
      >
        다음
      </Button>
    </div>
  );
};

export default StepSetUserName;

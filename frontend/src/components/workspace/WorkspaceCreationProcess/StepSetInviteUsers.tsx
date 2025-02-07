import { Button } from '@/components/ui/button';
import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';

const StepSetInviteUsers = () => {
  const { initWorkspaceStore } = useWorkspaceCreationStore();
  return (
    <div>
      <div className="mt-6">
        <WorkspaceCreationInput type="textarea" />
      </div>
      <div className="mt-6">
        <Button
          onClick={() => {
            initWorkspaceStore();
            alert('제출 완료');
          }}
        >
          버튼3
        </Button>
        <Button>초대 링크 복사</Button>
        <Button>이 단계 건너 뛰기</Button>
      </div>
    </div>
  );
};

export default StepSetInviteUsers;

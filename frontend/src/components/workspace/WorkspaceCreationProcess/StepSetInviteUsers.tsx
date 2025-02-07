import { Button } from '@/components/ui/button';
import WorkspaceCreationInput from '@/components/workspace/WorkspaceCreationInput';
import { useWorkspaceCreationStore } from '@/stores/workspace.store';

const StepSetInviteUsers = () => {
  const { initWorkspaceStore } = useWorkspaceCreationStore();
  return (
    <div>
      <WorkspaceCreationInput />
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
  );
};

export default StepSetInviteUsers;

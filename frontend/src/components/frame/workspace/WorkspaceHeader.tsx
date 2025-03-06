import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';

const WorkspaceHeader = () => {
  const navigate = useNavigate();
  const currenPath = window.location.pathname;
  const isCreateWorkspace = currenPath.includes('workspace/create');
  return (
    <div
      className={cn(
        'bg-yellow-400 w-full fixed h-12',
        !isCreateWorkspace && 'p-5'
      )}
    >
      {isCreateWorkspace && (
        <Button
          className="ml-auto bg-transparent"
          onClick={() => {
            navigate(-1);
          }}
        >
          홈으로 돌아가기
        </Button>
      )}
    </div>
  );
};

export default WorkspaceHeader;

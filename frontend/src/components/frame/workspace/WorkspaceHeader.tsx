import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';

const WorkspaceHeader = () => {
  const navigate = useNavigate();
  const currenPath = window.location.pathname;
  const isCreateWorkspace = currenPath.includes('workspace/create');
  return (
    <div className={cn('bg-yellow-400 w-full', !isCreateWorkspace && 'p-5')}>
      {isCreateWorkspace && (
        <Button
          className="bg-transparent ml-auto"
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

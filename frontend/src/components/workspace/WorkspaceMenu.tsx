import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import ArrorIcon from '@/components/common/ArrorIcon';

interface WorkspaceMenuProps {
  workspaceName: string;
  userRole: 'member' | 'admin';
  onInvite: () => void;
  onLogout: () => void;
  onLeave: () => void;
  onDelete: () => void;
  className?: string;
}

const WorkspaceMenu = ({
  workspaceName,
  userRole,
  onInvite,
  onLogout,
  onLeave,
  onDelete,
  className,
}: WorkspaceMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          variant="outline"
          className="bg-transparent border-none shadow-none w-full justify-between p-0 text-2xl hover:bg-transparent px-4"
        >
          <span> {workspaceName}</span>
          <div>
            <ArrorIcon className="rotate-90" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'w-64 bg-white shadow-lg rounded-md text-black',
          className
        )}
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 p-2">
            <img
              src=""
              alt="워크스페이스 프로필"
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <span>{workspaceName}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onInvite}>
          {`${workspaceName} 으로 사용자 초대`}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>로그아웃</DropdownMenuItem>
        {userRole === 'member' ? (
          <DropdownMenuItem onClick={onLeave}>
            워크스페이스 나가기
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={onDelete}>
            워크스페이스 삭제
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceMenu;

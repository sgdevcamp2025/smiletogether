import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface WorkspaceMenuProps {
  workspaceName: string;
  className?: string;
}

const WorkspaceMenu = ({ workspaceName, className }: WorkspaceMenuProps) => {
  return (
    <div
      className={cn('bg-white shadow-lg rounded-md w-64 text-black', className)}
    >
      <div className="flex items-center gap-2 p-2">
        <img
          src=""
          alt="워크스페이스 프로필"
          className="w-10 h-10 rounded-full bg-gray-200"
        />
        <span>{workspaceName}</span>
      </div>
      <div className="mt-2 flex flex-col">
        <WorkspaceMenuItem children={`${workspaceName} 으로 사용자 초대`} />
        <WorkspaceMenuItem children={'로그아웃'} />
        <WorkspaceMenuItem children={'워크스페이스 삭제'} />
      </div>
    </div>
  );
};

export default WorkspaceMenu;

const WorkspaceMenuItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700 border-t-2 bg-transparent shadow-none border-0">
      {children}
    </Button>
  );
};

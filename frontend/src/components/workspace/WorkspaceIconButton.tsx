import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WorkspaceIconButtonProps {
  className?: string;
  children: React.ReactNode;
}

const WorkspaceIconButton = ({
  className,
  children,
}: WorkspaceIconButtonProps) => {
  return (
    <Button
      className={cn(
        className,
        ' w-12 h-12 p-2 m-2 shadow-none hover:bg-yellow-100 flex flex-col'
      )}
    >
      {children}
    </Button>
  );
};

export default WorkspaceIconButton;

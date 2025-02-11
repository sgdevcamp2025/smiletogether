import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WorkspaceIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const WorkspaceIconButton = ({
  className,
  children,
  onClick,
}: WorkspaceIconButtonProps) => {
  return (
    <Button
      className={cn(
        ' w-12 h-12 p-2 m-2 shadow-none hover:bg-yellow-100 flex flex-col',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default WorkspaceIconButton;

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes } from 'react';

interface WorkspaceNextButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const WorkspaceNextButton = ({
  className,
  children,
  ...rest
}: WorkspaceNextButtonProps) => {
  return (
    <Button
      className={cn(className, ' w-32 hover:bg-yellow-300 bg-gray-500')}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default WorkspaceNextButton;

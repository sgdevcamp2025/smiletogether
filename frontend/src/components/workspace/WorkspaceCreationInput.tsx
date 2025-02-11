import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface WorkspaceCreationInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const WorkspaceCreationInput = ({
  className,
  ...rest
}: WorkspaceCreationInputProps) => {
  return (
    <Input
      className={cn(
        'outline-none focus:border-yellow-500 focus:ring-2',
        className
      )}
      {...rest}
    />
  );
};

export default WorkspaceCreationInput;

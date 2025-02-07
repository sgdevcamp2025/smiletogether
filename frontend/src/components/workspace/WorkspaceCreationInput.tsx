import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface WorkspaceCreationInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'input' | 'textarea';
  className?: string;
}

const WorkspaceCreationInput = ({
  type = 'input',
  className,
  ...rest
}: WorkspaceCreationInputProps) => {
  const renderInput = () => {
    if (type === 'input')
      return (
        <Input
          className={cn(
            'outline-none focus:border-yellow-500 focus:ring-2',
            className
          )}
          {...rest}
        />
      );
    if (type === 'textarea') return <Textarea />;
  };
  return renderInput();
};

export default WorkspaceCreationInput;

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface XButtonProps {
  className?: string;
  onClick: () => void;
}

const XButton = ({ className, onClick }: XButtonProps) => {
  return (
    <Button
      className={cn(
        'bg-transparent hover:bg-transparent p-0 text-black flex items-center justify-center text-2xl h-full',
        className
      )}
      onClick={onClick}
    >
      x
    </Button>
  );
};

export default XButton;

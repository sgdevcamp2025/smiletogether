import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SkipButtonProps {
  className?: string;
  onClick: () => void;
}

const SkipButton = ({ className, onClick }: SkipButtonProps) => {
  return (
    <Button
      className={cn('bg-white text-gray-500', className)}
      onClick={onClick}
    >
      지금은 건너뛰기
    </Button>
  );
};

export default SkipButton;

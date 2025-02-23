import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IoClose } from 'react-icons/io5';

interface XButtonProps {
  className?: string;
  onClick: () => void;
}

const XButton = ({ className, onClick }: XButtonProps) => {
  return (
    <Button
      className={cn(
        'bg-transparent hover:bg-transparent text-black ',
        className
      )}
      onClick={onClick}
    >
      <IoClose className="" />
    </Button>
  );
};

export default XButton;

import { cn } from '@/lib/utils';

interface ArrorIconProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ArrorIcon = ({ size = 'medium', className }: ArrorIconProps) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={cn(sizeClasses[size], className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default ArrorIcon;

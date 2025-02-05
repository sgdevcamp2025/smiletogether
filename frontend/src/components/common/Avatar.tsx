import { cn } from '@/lib/utils';
import {
  Avatar as RadixAvatar,
  AvatarFallback,
  AvatarImage,
} from '@radix-ui/react-avatar';
import { IoPersonSharp } from 'react-icons/io5';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  fallback?: string;
  className?: string;
}

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'small',
  fallback,
  className,
  ...rest
}: AvatarProps) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  };
  return (
    <RadixAvatar className={cn(sizeClasses[size], className)} {...rest}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        {fallback || <IoPersonSharp size={cn(sizeClasses[size], className)} />}
      </AvatarFallback>
    </RadixAvatar>
  );
};

export default Avatar;

import { formatTime } from '@/lib/date';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import UserHoverCard from './UserHoverCard';
import { User } from '@/types/uset';

interface MessageProps {
  user: User;
  content: string;
  createdAt: string;
}

const Message = ({ user, content, createdAt }: MessageProps) => {
  return (
    <div className="flex gap-2">
      <Avatar className="rounded-lg w-12 h-12">
        <AvatarImage src={user.profileImage} alt="유저의 프로필이미지" />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex gap-2 items-center">
          <UserHoverCard
            userId={user.userId}
            username={user.username}
            displayName={user.displayName}
            profileImage="https://github.com/shadcn.png"
            isActive={true}
            isMessage={true}
          />
          <p className="text-zinc-400 text-sm">{formatTime(createdAt)}</p>
        </div>
        <p className="text-base">{content}</p>
      </div>
    </div>
  );
};

export default Message;

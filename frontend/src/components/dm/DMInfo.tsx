import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/user';
import clsx from 'clsx';
import UserHoverCard from '../common/UserHoverCard';

const DMInfo = ({
  profileImage,
  username,
  userId,
  displayName,
  isActive,
  position,
}: User) => {
  return (
    <div className="flex flex-col items-start gap-4 px-5 py-10 w-full h-fit">
      <div className="flex gap-4 items-center">
        <Avatar className="rounded-lg w-20 h-20">
          <AvatarImage src={profileImage} alt="유저의 프로필이미지" />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex gap-2 items-center">
            <span className="font-bold text-base">{displayName}</span>
            <div
              className={clsx(
                'w-2 h-2 rounded-[2px]',
                isActive ? 'bg-lime-500' : 'bg-zinc-400'
              )}
            />
          </div>
          {position && <p className="text-sm">{position}</p>}
        </div>
      </div>
      <p className="text-sm text-zinc-500">
        이 대화는 나와{' '}
        <UserHoverCard
          userId={userId}
          username={username}
          displayName={displayName}
          profileImage="https://github.com/shadcn.png"
          isActive={true}
        />
        님 간의 대화입니다.
      </p>
    </div>
  );
};

export default DMInfo;

import clsx from 'clsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { User } from '@/types/uset';

const UserHoverCard = ({
  username,
  displayName,
  profileImage,
  statusMessage,
  isActive,
  isMessage,
}: User) => {
  return (
    <HoverCard>
      <HoverCardTrigger
        className={clsx(
          'rounded-sm',
          isMessage
            ? 'text-zinc-950 bg-white font-bold'
            : 'text-blue-600 bg-blue-100 p-1'
        )}
      >
        {isMessage ? displayName : `@${displayName}`}
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="rounded-lg w-14 h-14">
            <AvatarImage src={profileImage} alt="유저의 프로필이미지" />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
          <h1 className="font-semibold">{username}</h1>
          <div
            className={clsx(
              'w-2 h-2 rounded-[2px]',
              isActive ? 'bg-lime-500' : 'bg-zinc-400'
            )}
          />
        </div>
        {statusMessage && <h6 className="text-xs">{statusMessage}</h6>}
        {/* 나중에 로그인 부분이 구현되고 본인 프로필 조회 시에는 메시지가 안뜨도록 변경할 예정*/}
        <div
          className="flex items-center gap-2 border border-gray-400 rounded-lg justify-center"
          onClick={() => {
            console.log('나중에 여기는 대화 상대와 메시지하는 페이지로 연결');
          }}
        >
          <img src="/icons/Message.svg" alt="메시지" />
          메시지
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;

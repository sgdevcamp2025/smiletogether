import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/user';

interface DMListProps {
  participants: User;
  senderId: string;
  content: string;
  createdAt: string;
  unreadCount: number;
}

const DMList = ({
  participants,
  senderId,
  content,
  createdAt,
  unreadCount,
}: DMListProps) => {
  const date = new Date(createdAt);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className="flex gap-2 w-full hover:bg-amber-300 py-4 px-4 border-b-white border-b">
      <Avatar className="rounded-lg w-12 h-12">
        <AvatarImage
          src={participants.profileImage}
          alt="유저의 프로필이미지"
        />
        <AvatarFallback>{participants.username}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-white">
            {participants.displayName}
          </span>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-white">{`${month}월 ${day}일`}</p>
            {unreadCount > 0 && (
              <div className="rounded-full bg-amber-300 px-2 py-[1px] text-sm text-white">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-white">
          {participants.userId === senderId ? `나 : ${content}` : content}
        </p>
      </div>
    </div>
  );
};

export default DMList;

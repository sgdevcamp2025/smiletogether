import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DMItem } from '@/types/dm';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router';

//@TODO 단체 채팅일 경우 고려해야함

const DMList = ({ dmId, participants, lastMessage, unreadCount }: DMItem) => {
  const date = new Date(lastMessage.createdAt);
  const { workspaceId, dmId: currentDMId } = useParams();
  const navigate = useNavigate();

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div
      className={clsx(
        'flex w-full gap-2 px-4 py-4 border-b hover:bg-amber-300 border-b-white',
        String(currentDMId) === String(dmId) && 'bg-amber-300'
      )}
      onClick={() => {
        navigate(`/workspace/${workspaceId}/dm/${dmId}`);
      }}
    >
      <Avatar className="w-12 h-12 rounded-lg">
        <AvatarImage
          src={participants[0].profileImage}
          alt="유저의 프로필이미지"
        />
        <AvatarFallback>{participants[0].username}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-white">
            {participants[0].displayName}
          </span>
          <div className="flex items-center gap-2">
            <p className="text-sm text-white">{`${month}월 ${day}일`}</p>
            {unreadCount > 0 && (
              <div className="rounded-full bg-amber-300 px-2 py-[1px] text-sm text-white">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-white">
          {participants[0].userId === lastMessage.senderId
            ? `나 : ${lastMessage.content}`
            : lastMessage.content}
        </p>
      </div>
    </div>
  );
};

export default DMList;

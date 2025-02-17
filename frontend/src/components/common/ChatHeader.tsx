import { useState } from 'react';
import { User } from '@/types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ChannleDelete from '../channel/ChannleDelete';
import ChannleInfoModal from '../channel/infoModal';

interface ChatHeaderProps {
  name: string;
  isPrivate?: boolean;
  totalMembers?: number;
  members?: User[];
  manager: string;
}

const ChatHeader = ({
  name,
  isPrivate,
  totalMembers,
  members,
  manager,
}: ChatHeaderProps) => {
  const [openDeleteChannel, setOpenDeleteChannel] = useState(false);
  const [openInfoChannel, setOpenInfoChannel] = useState(false);
  const displayMembers = members ? members?.slice(0, 3) : [];

  const handleDeleteChannel = () => {
    if (isPrivate) {
      setTimeout(() => setOpenDeleteChannel(true), 100);
    } else {
      onClickDelteChannel();
    }
  };

  const onClickDelteChannel = () => {
    setOpenDeleteChannel(false);
    console.log('채널에서 나가기 API 연동해야합니다');
  };

  return (
    <header className="flex flex-col w-full px-5 pt-3 pb-0 gap-4 border-b border-zinc-200">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {isPrivate && (
            <img className="w-5 h-5" src="/icons/Private.svg" alt="private" />
          )}
          <span
            onClick={() => setOpenInfoChannel(true)}
            className="text-lg font-bold"
          >
            {name}
          </span>
        </div>

        <div className="flex gap-2">
          {members && (
            <div
              className="flex items-center gap-2 border px-2 rounded-sm"
              onClick={() => setOpenInfoChannel(true)}
            >
              <div className="flex gap-1">
                {displayMembers.map(item => (
                  <img
                    key={item.userId}
                    className="w-5 h-5 rounded-sm -ml-3 first:ml-0"
                    src={item.profileImage}
                  />
                ))}
              </div>
              {totalMembers}
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() => {
                  console.log('허들로 연결');
                }}
              >
                <img
                  className="border p-[2px] rounded-sm"
                  src="/icons/Huddle.svg"
                  alt="huddle"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>채널에서 허들 시작</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img src="/icons/Option.svg" alt="option" />
            </DropdownMenuTrigger>
            <DropdownMenuContent forceMount>
              <DropdownMenuItem onClick={() => setOpenInfoChannel(true)}>
                채널 세부정보 열기
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={handleDeleteChannel}
              >
                채널에서 나가기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <div className="flex gap-1 pb-2 border-b-amber-300 border-b-2 w-fit">
          <img src="/icons/Message.svg" alt="메시지" />
          <span className="font-semibold">메시지</span>
        </div>
      </div>

      {/* 채널 정보 모달 */}
      {members && (
        <ChannleInfoModal
          open={openInfoChannel}
          setOpen={setOpenInfoChannel}
          totalMembers={totalMembers}
          isPrivate={isPrivate}
          name={name}
          manager={manager}
          setOpenDeleteChannel={setOpenDeleteChannel}
          members={members}
        />
      )}

      {/* 채널에서 나가기 */}
      <ChannleDelete
        openDeleteChannel={openDeleteChannel}
        setOpenDeleteChannel={setOpenDeleteChannel}
        name={name}
        isPrivate={isPrivate}
        onClickDeleteChannel={onClickDelteChannel}
      />
    </header>
  );
};

export default ChatHeader;

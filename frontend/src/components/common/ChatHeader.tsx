import { User } from '@/types/uset';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ChatHeaderProps {
  name: string;
  isPrivate?: boolean;
  totalMembers?: number;
  members?: User[];
}

const ChatHeader = ({
  name,
  isPrivate,
  totalMembers,
  members,
}: ChatHeaderProps) => {
  const displayMembers = members ? members?.slice(0, 3) : [];

  return (
    <header className="flex flex-col w-full px-5 pt-3 pb-0 gap-4 border-b border-zinc-200">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {isPrivate && (
            <img className="w-5 h-5" src="/icons/Private.svg" alt="private" />
          )}
          <span className="text-lg font-bold">{name}</span>
        </div>
        <div className="flex gap-2">
          {members && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className="flex items-center gap-2 border px-2 rounded-sm"
                  onClick={() => {
                    console.log('유저 모달 연결');
                  }}
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>이 channel의 모든 멤버 보기</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            <DropdownMenuContent>
              <DropdownMenuItem>채널 세부정보 열기</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
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
    </header>
  );
};

export default ChatHeader;

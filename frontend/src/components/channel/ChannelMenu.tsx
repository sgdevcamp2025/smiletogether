import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MdOutlineAddBox } from 'react-icons/md';

interface ChannelMenuProps {
  onCreateChannel: () => void;
  onExploreChannels: () => void;
}

const ChannelMenu = ({
  onCreateChannel,
  onExploreChannels,
}: ChannelMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="w-full bg-transparent shadow-none border-none flex justify-start hover:bg-slate-100"
      >
        <Button variant="outline">
          <MdOutlineAddBox />
          채널 추가
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onCreateChannel}>
            채널 생성하기
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExploreChannels}>
            채널 탐색하기
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChannelMenu;

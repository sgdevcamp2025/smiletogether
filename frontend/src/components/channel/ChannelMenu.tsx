import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onCreateChannel}>
            채널 생성하기
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExploreChannels}>
            채널 탐색하기
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChannelMenu;

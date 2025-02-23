import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface ChannelMenuProps {
  onCreateChannel: () => void;
  onExploreChannels: () => void;
  className?: string;
}

const ChannelMenu = ({
  onCreateChannel,
  onExploreChannels,
  className,
}: ChannelMenuProps) => {
  return (
    <div
      className={cn('bg-white shadow-lg rounded-md w-64 text-black', className)}
    >
      <div className="flex flex-col">
        <ChannelMenuItem children={'새 채널 생성'} onClick={onCreateChannel} />
        <ChannelMenuItem children={'채널 탐색'} onClick={onExploreChannels} />
      </div>
    </div>
  );
};

export default ChannelMenu;

interface ChannelMenuItemProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ChannelMenuItem = ({ onClick, children }: ChannelMenuItemProps) => {
  return (
    <Button
      className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700 border-t-2 bg-transparent shadow-none border-0 justify-start"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

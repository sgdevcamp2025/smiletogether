import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User } from '@/types/user';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Info from './Info';
import Members from './Members';

interface ChannelInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  totalMembers?: number;
  isPrivate?: boolean;
  name: string;
  manager: string;
  setOpenDeleteChannel: (open: boolean) => void;
  members: User[];
  tab: string;
}

const ChannleInfoModal = ({
  open,
  setOpen,
  totalMembers,
  isPrivate,
  name,
  manager,
  setOpenDeleteChannel,
  members,
  tab,
}: ChannelInfoModalProps) => {
  const [currentTab, setCurrentTab] = useState(tab);

  useEffect(() => {
    setCurrentTab(tab);
  }, [tab]);

  const handleLeaveChannel = () => {
    setOpen(false);
    setTimeout(() => setOpenDeleteChannel(true), 100);
  };

  const tabs = [
    { key: '정보', label: '정보' },
    { key: '멤버', label: `멤버 ${totalMembers}` },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby={undefined} className="w-full p-0 gap-0">
        <DialogHeader className="p-5">
          <DialogTitle>
            <div className="flex gap-2 items-center">
              {isPrivate && (
                <img
                  className="w-5 h-5"
                  src="/icons/Private.svg"
                  alt="private"
                />
              )}
              {name}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex border-b border-zinc-300 w-full px-5 pt-2 gap-4">
          {tabs.map(({ key, label }) => (
            <span
              key={key}
              className={clsx(
                'relative px-2 cursor-pointer',
                currentTab === key &&
                  'after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-amber-500'
              )}
              onClick={() => setCurrentTab(key)}
            >
              {label}
            </span>
          ))}
        </div>
        {currentTab === '정보' ? (
          <Info manager={manager} handleLeaveChannel={handleLeaveChannel} />
        ) : (
          <div className="flex flex-col p-5 rounded-lg gap-4 max-h-[400px] overflow-auto scrollbar-hide">
            {members.map(item => (
              <Members
                key={item.userId}
                userId={item.userId}
                profileImage={item.profileImage}
                displayName={item.displayName}
                username={item.username}
                isActive={item.isActive}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChannleInfoModal;

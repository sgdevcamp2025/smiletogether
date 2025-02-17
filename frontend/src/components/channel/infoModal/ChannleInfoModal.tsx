import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User } from '@/types/user';
import { DialogTrigger } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import React, { useState } from 'react';
import Info from './Info';

interface ChannelInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  totalMembers?: number;
  isPrivate?: boolean;
  name: string;
  manager: string;
  setOpenDeleteChannel: (open: boolean) => void;
  members: User[];
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
}: ChannelInfoModalProps) => {
  const [currentTab, setCurrentTab] = useState('정보');

  const handleLeaveChannel = () => {
    setOpen(false);
    setTimeout(() => setOpenDeleteChannel(true), 100);
  };

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
          <span
            className={clsx(
              'relative px-2 cursor-pointer',
              currentTab === '정보' &&
                'after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-amber-500'
            )}
            onClick={() => setCurrentTab('정보')}
          >
            정보
          </span>
          <span
            className={clsx(
              'relative px-2 cursor-pointer',
              currentTab === '멤버' &&
                'after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-amber-500'
            )}
            onClick={() => setCurrentTab('멤버')}
          >
            멤버 {totalMembers}
          </span>
        </div>
        {currentTab === '정보' ? (
          <Info manager={manager} handleLeaveChannel={handleLeaveChannel} />
        ) : (
          <div className="flex flex-col p-5 rounded-lg gap-4 max-h-[400px] overflow-auto scrollbar-hide">
            {members.map(item => (
              <div className="flex gap-1 items-center">
                <img
                  key={item.userId}
                  className="w-10 h-10 rounded-sm -ml-3 first:ml-0"
                  src={item.profileImage}
                />
                <span className="font-semibold">{item.displayName}</span>
                <span className="text-zinc-600">{item.username}</span>
                <div
                  className={clsx(
                    'w-2 h-2 rounded-[2px]',
                    item.isActive ? 'bg-lime-500' : 'bg-zinc-400'
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChannleInfoModal;

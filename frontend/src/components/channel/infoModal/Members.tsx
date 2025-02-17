import { User } from '@/types/user';
import clsx from 'clsx';

const Members = ({ profileImage, displayName, username, isActive }: User) => {
  return (
    <div className="flex gap-1 items-center">
      <img
        className="w-10 h-10 rounded-sm -ml-3 first:ml-0"
        src={profileImage}
      />
      <span className="font-semibold">{displayName}</span>
      <span className="text-zinc-600">{username}</span>
      <div
        className={clsx(
          'w-2 h-2 rounded-[2px]',
          isActive ? 'bg-lime-500' : 'bg-zinc-400'
        )}
      />
    </div>
  );
};

export default Members;

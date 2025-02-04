import { WorkSpaceAvatarList } from '@/components/workspace/WorkSpaceAvatarList';
import { MemberProps } from '@/components/workspace/WorkSpaceListItem';
import { IoPersonSharp } from 'react-icons/io5';

interface WorkSpaceListItemDetailProps {
  name: string;
  members: MemberProps[];
  memberCount: number;
}

export const WorkSpaceListItemDetail = ({
  name,
  members,
  memberCount,
}: WorkSpaceListItemDetailProps) => {
  return (
    <div className="pl-4 flex flex-col">
      <h2 className="font-medium">{name}</h2>
      <div className="flex">
        {memberCount > 0 ? (
          <WorkSpaceAvatarList members={members} />
        ) : (
          <IoPersonSharp className="w-5 h-5" />
        )}
        <p className="text-gray-600 text-sm pl-2">{memberCount} 명의 멤버</p>
      </div>
    </div>
  );
};

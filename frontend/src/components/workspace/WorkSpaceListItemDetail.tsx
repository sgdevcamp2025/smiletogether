import { WorkSpaceAvatarList } from '@/components/workspace/WorkSpaceAvatarList';
import { memberProps } from '@/components/workspace/WorkSpaceListItem';

interface WorkSpaceListItemDetailProps {
  name: string;
  members: memberProps[];
  memberCount: number;
}

export const WorkSpaceListItemDetail = ({
  name,
  members,
  memberCount,
}: WorkSpaceListItemDetailProps) => {
  return (
    <div className="pl-2 flex flex-col">
      <h2 className="font-medium">{name}</h2>
      <div className="flex">
        <WorkSpaceAvatarList members={members} />
        <p className="text-gray-600 text-sm">{memberCount}</p>
      </div>
    </div>
  );
};

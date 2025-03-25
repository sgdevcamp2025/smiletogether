import { IoPersonSharp } from 'react-icons/io5';
import WorkspaceAvatarList from '@/components/workspace/WorkspaceAvatarList';
import { WorkspaceMember } from '@/types/user';

interface WorkspaceListItemDetailProps {
  name: string;
  members: WorkspaceMember[];
  memberCount: number;
}

const WorkspaceListItemDetail = ({
  name,
  members,
  memberCount,
}: WorkspaceListItemDetailProps) => {
  return (
    <div className="pl-4 flex flex-col">
      <h2 className="font-medium">{name}</h2>
      <div className="flex">
        {memberCount > 0 ? (
          <WorkspaceAvatarList members={members} />
        ) : (
          <IoPersonSharp className="w-5 h-5" />
        )}
        <p className="text-gray-600 text-sm pl-2">{memberCount} 명의 멤버</p>
      </div>
    </div>
  );
};

export default WorkspaceListItemDetail;

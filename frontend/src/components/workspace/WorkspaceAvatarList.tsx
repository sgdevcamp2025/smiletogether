import Avatar from '@/components/common/Avatar';
import { WorkspaceMember } from '@/types/user';

interface WorkspaceAvatarListProps {
  members: WorkspaceMember[];
}

const WorkspaceAvatarList = ({ members }: WorkspaceAvatarListProps) => {
  return (
    <div className="flex -space-x-1">
      {members &&
        members
          .slice(0, 5)
          .map(item => (
            <Avatar src={item.profileImage} alt="user_profile_image" />
          ))}
    </div>
  );
};

export default WorkspaceAvatarList;

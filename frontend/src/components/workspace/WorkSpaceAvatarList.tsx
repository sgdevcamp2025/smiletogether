import Avatar from '@/components/common/Avatar';
import { MemberProps } from '@/components/workspace/WorkSpaceListItem';

interface WorkspaceAvatarListProps {
  members: MemberProps[];
}

const WorkspaceAvatarList = ({ members }: WorkspaceAvatarListProps) => {
  return (
    <div className="flex -space-x-1">
      {members.slice(0, 5).map(item => (
        <Avatar src={item.profile_image} alt="user_profile_image" />
      ))}
    </div>
  );
};

export default WorkspaceAvatarList;

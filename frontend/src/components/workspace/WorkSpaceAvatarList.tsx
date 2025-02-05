import Avatar from '@/components/common/Avatar';
import { MemberProps } from '@/components/workspace/WorkspaceListItem';

interface WorkSpaceAvatarListProps {
  members: MemberProps[];
}

const WorkSpaceAvatarList = ({ members }: WorkSpaceAvatarListProps) => {
  return (
    <div className="flex -space-x-1">
      {members.slice(0, 5).map(item => (
        <Avatar src={item.profile_image} alt="user_profile_image" />
      ))}
    </div>
  );
};

export default WorkSpaceAvatarList;

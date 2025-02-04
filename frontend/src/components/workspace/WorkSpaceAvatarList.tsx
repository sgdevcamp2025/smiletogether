import { Avatar } from '@/components/common/Avatar';
import { memberProps } from '@/components/workspace/WorkSpaceListItem';

interface WorkSpaceAvatarListProps {
  members: memberProps[];
}

export const WorkSpaceAvatarList = ({ members }: WorkSpaceAvatarListProps) => {
  return members.map(item => {
    return (
      <div className="flex">
        <Avatar src={item.profile_image} alt="user_profile_image" />
      </div>
    );
  });
};

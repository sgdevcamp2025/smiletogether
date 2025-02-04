import { Avatar } from '@/components/common/Avatar';
import { MemberProps } from '@/components/workspace/WorkSpaceListItem';

interface WorkSpaceAvatarListProps {
  members: MemberProps[];
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

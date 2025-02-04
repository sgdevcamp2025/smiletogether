import { Avatar } from '@/components/common/Avatar';
import { WorkSpaceListItemDetail } from '@/components/workspace/WorkSpaceListItemDetail';
import { ArrorIcon } from '@/components/common/ArrorIcon';

interface WorkSpaceListItemProps {
  name: string;
  profileImage: string;
  memberCount: number;
  members: MemberProps[];
}

export interface MemberProps {
  user_id: string;
  profile_image: string;
}

export const WorkSpaceListItem = ({
  name,
  profileImage,
  memberCount,
  members,
}: WorkSpaceListItemProps) => {
  return (
    <div className="flex items-center px-6 py-4 w-full max-w-lg border  shadow hover:bg-gray-50">
      <Avatar src={profileImage} alt="workspace_profile_image" fallback="CN" />
      <WorkSpaceListItemDetail
        name={name}
        members={members}
        memberCount={memberCount}
      />
      <div className="ml-auto text-gray-400">
        <ArrorIcon />
      </div>
    </div>
  );
};

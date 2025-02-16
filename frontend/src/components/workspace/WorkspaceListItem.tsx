import { useNavigate } from 'react-router';
import Avatar from '@/components/common/Avatar';
import ArrorIcon from '@/components/common/ArrorIcon';
import WorkspaceListItemDetail from '@/components/workspace/WorkspaceListItemDetail';

interface WorkspaceListItemProps {
  name: string;
  profileImage: string;
  memberCount: number;
  members: MemberProps[];
  workspaceId: string;
}

export interface MemberProps {
  user_id: string;
  profile_image: string;
}

const WorkspaceListItem = ({
  name,
  profileImage,
  memberCount,
  members,
  workspaceId,
}: WorkspaceListItemProps) => {
  const navigate = useNavigate();

  const handleNavigate = (workspaceId: string) => {
    navigate(`/workspace/${workspaceId}`);
  };

  return (
    <div className="flex items-center px-6 py-4 w-full max-w-lg border  shadow hover:bg-gray-50">
      <Avatar src={profileImage} alt="workspace_profile_image" fallback="CN" />
      <WorkspaceListItemDetail
        name={name}
        members={members}
        memberCount={memberCount}
      />
      <div
        className="ml-auto text-gray-400"
        onClick={() => {
          handleNavigate(workspaceId);
        }}
      >
        <ArrorIcon />
      </div>
    </div>
  );
};

export default WorkspaceListItem;

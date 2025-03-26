import { useNavigate } from 'react-router';
import Avatar from '@/components/common/Avatar';
import ArrorIcon from '@/components/common/ArrorIcon';
import { WorkspaceMember } from '@/types/user';
import WorkspaceListItemDetail from '@/components/workspace/WorkspaceListItemDetail';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';

interface WorkspaceListItemProps {
  name: string;
  profileImage: string;
  memberCount: number;
  members: WorkspaceMember[];
  workspaceId: string;
}

const WorkspaceListItem = ({
  name,
  profileImage,
  memberCount,
  members,
  workspaceId,
}: WorkspaceListItemProps) => {
  const navigate = useNavigate();

  const navigateToWorkspace = (workspaceId: string, channelId: string) => {
    navigate(`/workspace/${workspaceId}/channel/${channelId}`);
  };

  const { channelList = [] } = useWorkspaceChannelListQuery(workspaceId!);

  return (
    <div className="flex items-center px-6 py-4 w-full border  shadow hover:bg-gray-50">
      <Avatar src={profileImage} alt="workspace_profile_image" fallback="CN" />
      <WorkspaceListItemDetail
        name={name}
        members={members}
        memberCount={memberCount}
      />
      <div
        className="ml-auto text-gray-400"
        onClick={() => {
          navigateToWorkspace(workspaceId, channelList[0].channelId);
        }}
      >
        <ArrorIcon />
      </div>
    </div>
  );
};

export default WorkspaceListItem;

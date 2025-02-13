import { useParams } from 'react-router';
import useUserWorkspaceQuery from '@/hooks/WorkSpace/useUserWorkspaceQuery';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import WorkspaceChannelList from '@/components/workspace/WorkspaceSideBar/WorkspaceSidebarSection';

const WorkspaceChannelSidebar = () => {
  const { workspaceID } = useParams();
  const {
    data: workspacesInfo,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useUserWorkspaceQuery(workspaceID!);

  const {
    data: channelList = [],
    isLoading: isChannelLoading,
    isError: isChannelError,
  } = useWorkspaceChannelListQuery(workspaceID!);

  if (isChannelLoading || isWorkspaceLoading) return <p>로딩 중입니다!</p>;
  if (isChannelError || isWorkspaceError) return <p>에러가 발생했습니다!</p>;

  return (
    <div className="text-wrap">
      <h3 className="mt-4 px-4 scroll-m-20 text-xl font-semibold tracking-tight text-white">
        {workspacesInfo?.name}
      </h3>
      <WorkspaceChannelList sectionTitle={'채널'} listItems={channelList} />
    </div>
  );
};

export default WorkspaceChannelSidebar;

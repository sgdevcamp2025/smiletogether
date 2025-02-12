import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import useUserWorkspacesQuery from '@/hooks/workspace/useUserWorkspacesQuery';

const WorkspaceChannelSidebar = () => {
  const { workspaceID } = useParams();

  const {
    data: channelList,
    isLoading: isChannelLoading,
    isError: isChannelError,
  } = useWorkspaceChannelListQuery(workspaceID!);

  const {
    data: workspaceInfo,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useUserWorkspacesQuery();

  useEffect(() => {
    console.log('params', workspaceID);
  }, []);

  if (isChannelLoading || isWorkspaceLoading) return <p>로딩 중입니다!</p>;
  if (isChannelError || isWorkspaceError) return <p>에러가 발생했습니다!</p>;

  return (
    <div className="text-wrap">
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"></h3>
    </div>
  );
};

export default WorkspaceChannelSidebar;

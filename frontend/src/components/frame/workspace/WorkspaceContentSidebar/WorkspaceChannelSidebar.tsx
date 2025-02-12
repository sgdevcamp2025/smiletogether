import { useEffect } from 'react';
import { useParams } from 'react-router';
import useUserWorkspaceQuery from '@/hooks/workspace/useUserWorkspaceQuery';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';

const WorkspaceChannelSidebar = () => {
  const { workspaceID } = useParams();
  const {
    data: workspacesInfo,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useUserWorkspaceQuery(workspaceID!);

  const {
    data: channelList,
    isLoading: isChannelLoading,
    isError: isChannelError,
  } = useWorkspaceChannelListQuery(workspaceID!);
  useEffect(() => {
    console.log('params', workspaceID, 'workspacesInfo', workspacesInfo);
  }, []);

  if (isChannelLoading || isWorkspaceLoading) return <p>로딩 중입니다!</p>;
  if (isChannelError || isWorkspaceError) return <p>에러가 발생했습니다!</p>;

  return (
    <div className="text-wrap">
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {workspacesInfo?.name}
      </h3>
    </div>
  );
};

export default WorkspaceChannelSidebar;

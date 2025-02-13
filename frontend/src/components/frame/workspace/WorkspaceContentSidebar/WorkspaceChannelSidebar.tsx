import { useParams } from 'react-router';
import useUserWorkspaceQuery from '@/hooks/workspace/useUserWorkspaceQuery';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import WorkspaceChannelList from '@/components/workspace/WorkspaceSideBar/WorkspaceChannelList';
import useGetDMListQuery from '@/hooks/dm/useGetDMListQuery';
import WorkspaceDMList from '@/components/workspace/WorkspaceSideBar/WorkspaceDMList';
import { useEffect } from 'react';

const WorkspaceChannelSidebar = () => {
  const { workspaceID } = useParams();
  const {
    data: workspacesInfo,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useUserWorkspaceQuery(workspaceID!);
  const {
    data: dmList,
    isLoading: isDMLoading,
    isError: isDMError,
  } = useGetDMListQuery(workspaceID!);

  const {
    data: channelList = [],
    isLoading: isChannelLoading,
    isError: isChannelError,
  } = useWorkspaceChannelListQuery(workspaceID!);
  useEffect(() => {
    console.log(dmList);
  }, []);

  if (isChannelLoading || isWorkspaceLoading || isDMLoading)
    return <p>로딩 중입니다!</p>;
  if (isChannelError || isWorkspaceError || isDMError)
    return <p>에러가 발생했습니다!</p>;

  return (
    <div className="text-wrap">
      <h2 className="mt-3 px-4 scroll-m-20 text-2xl font-semibold tracking-tight text-white">
        {workspacesInfo?.name}
      </h2>
      <WorkspaceChannelList sectionTitle={'채널'} listItems={channelList} />
      <WorkspaceDMList
        sectionTitle="다이렉트 메세지"
        listItems={dmList ? dmList?.dms : []}
      />
    </div>
  );
};

export default WorkspaceChannelSidebar;

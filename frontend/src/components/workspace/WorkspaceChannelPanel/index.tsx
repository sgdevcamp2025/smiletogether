import { useNavigate, useParams } from 'react-router';
import useUserWorkspaceQuery from '@/hooks/workspace/useUserWorkspaceQuery';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import useGetDMListQuery from '@/hooks/dm/useGetDMListQuery';
import WorkspaceMenu from '@/components/workspace/WorkspaceMenu';
import { useModalStore } from '@/stores/modalStore';
import ModalManager from '@/components/modals/ModalManager';
import WorkspaceChannels from '@/components/workspace/WorkspaceChannelPanel/WorkspaceChannels';
import WorkspaceDMs from '@/components/workspace/WorkspaceChannelPanel/WorkspaceDMs';
import { useUserStore } from '@/stores/userStore';
import { useEffect } from 'react';

const WorkspaceChannelPanel = () => {
  const { workspaceId } = useParams();

  const { workspaceInfo, isWorkspaceLoading, isWorkspaceError } =
    useUserWorkspaceQuery(workspaceId!);
  const {
    data: dmList = { dms: [] },
    isLoading: isDMLoading,
    isError: isDMError,
  } = useGetDMListQuery(workspaceId!);

  const {
    channelList = [],
    isChannelLoading,
    isChannelError,
  } = useWorkspaceChannelListQuery(workspaceId!);
  useEffect(() => {
    console.log('workspaceInfo', workspaceInfo);
  }, [workspaceInfo]);
  const workspaceName = workspaceInfo?.name ?? '알 수 없는 워크스페이스';
  const setModal = useModalStore(state => state.setModal);
  const user = useUserStore(state => state.user);
  const currentUserRole =
    workspaceInfo?.ownerId === user.userId ? 'admin' : 'member';

  const naviagte = useNavigate();

  if (!workspaceId) return <p>워크스페이스 정보를 불러오는 중...</p>;
  if (isChannelLoading || isWorkspaceLoading || isDMLoading)
    return <p>로딩 중입니다!</p>;
  if (isChannelError || isWorkspaceError || isDMError)
    return <p>에러가 발생했습니다!</p>;

  return (
    <div className=" min-w-16 bg-yellow-300 text-white flex py-2 flex-col gap-2 text-wrap h-screen">
      <WorkspaceMenu
        workspaceName={workspaceName}
        userRole={currentUserRole}
        onInvite={() => {
          setModal('USER_INVITE');
        }}
        onLogout={() => {
          alert('로그아웃이 완료되었습니다');
          naviagte('/');
        }}
        onDelete={() => {
          setModal('WORKSPACE_DELETE');
        }}
        onLeave={() => {
          setModal('WORKSPACE_LEAVE');
        }}
      />

      <WorkspaceChannels
        onCreateChannel={() => setModal('CHANNEL_CREATE')}
        onExploreChannels={() =>
          alert('채널 탐색은 아직 준비중인 서비스입니다')
        }
        channelList={channelList}
      />
      <WorkspaceDMs
        dmList={dmList.dms ?? []}
        onAddColleauge={() => setModal('USER_INVITE')}
      />
      <ModalManager workspaceName={workspaceName} workspaceId={workspaceId!} />
    </div>
  );
};

export default WorkspaceChannelPanel;

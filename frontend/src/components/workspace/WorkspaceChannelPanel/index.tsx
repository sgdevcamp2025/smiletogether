import { useParams } from 'react-router';
import { MdOutlineAddBox } from 'react-icons/md';
import WorkspaceAccordionSection from '@/components/workspace/WorkspaceAccordionList';
import WorkspaceChannelListItem from '@/components/workspace/WorkspaceChannelPanel/WorkspaceChannelListItem';
import WorkspaceDirectMessageListItem from '@/components/workspace/WorkspaceChannelPanel/WorkspaceDirectMessageListItem';
import useUserWorkspaceQuery from '@/hooks/workspace/useUserWorkspaceQuery';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import useGetDMListQuery from '@/hooks/dm/useGetDMListQuery';
import WorkspaceUserInviteModal from '@/components/workspace/Modal/WorkspaceUserInviteModal';
import ArrorIcon from '@/components/common/ArrorIcon';
import WorkspaceMenu from '@/components/workspace/WorkspaceMenu';
import useLeaveWorkspaceMutation from '@/hooks/workspace/useLeaveWorkspaceMutation';
import useRemoveWorkspaceMutation from '@/hooks/workspace/useRemoveWorkspaceMutation';
import WorkspaceActionModal from '@/components/workspace/Modal/WorkspaceActionModal';
import { ModalType, useModalStore } from '@/stores/modalStore';

const WorkspaceChannelPanel = () => {
  const { workspaceId } = useParams();

  const {
    data: workspacesInfo,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useUserWorkspaceQuery(workspaceId!);
  const {
    data: dmList,
    isLoading: isDMLoading,
    isError: isDMError,
  } = useGetDMListQuery(workspaceId!);

  const {
    data: channelList = [],
    isLoading: isChannelLoading,
    isError: isChannelError,
  } = useWorkspaceChannelListQuery(workspaceId!);

  const workspaceName = workspacesInfo?.name ?? '알 수 없는 워크스페이스';
  const modal = useModalStore(state => state.modal);
  const setModal = useModalStore(state => state.setModal);
  const isOpen = (key: ModalType) => modal === key;

  if (!workspaceId) return <p>워크스페이스 정보를 불러오는 중...</p>;
  if (isChannelLoading || isWorkspaceLoading || isDMLoading)
    return <p>로딩 중입니다!</p>;
  if (isChannelError || isWorkspaceError || isDMError)
    return <p>에러가 발생했습니다!</p>;

  return (
    <div className=" min-w-16 bg-yellow-200 text-white flex py-2 flex-col gap-2 text-wrap h-screen">
      <h2
        className="mt-3 px-4 scroll-m-20 text-2xl font-semibold tracking-tight text-white flex justify-between items-center"
        onClick={() => {
          setModal('WORKSPACE_MENU');
        }}
      >
        <span>{workspaceName} </span>
        <div>
          <ArrorIcon className="rotate-90" />
        </div>
      </h2>
      {isOpen('WORKSPACE_MENU') && (
        <WorkspaceMenu
          workspaceName={workspaceName}
          onInvite={() => {
            setModal('USER_INVITE');
          }}
          onLogout={() => alert('로그아웃이 완료되었습니다.')}
          onDelete={() => {
            setModal('WORKSPACE_DELETE');
          }}
          onLeave={() => {
            setModal('WORKSPACE_LEAVE');
          }}
        />
      )}
      <WorkspaceAccordionSection
        sectionTitle="채널"
        createButtonIcon={<MdOutlineAddBox />}
        createButtonText="채널 추가"
      >
        {channelList?.map((channel, index) => (
          <WorkspaceChannelListItem channel={channel} key={index} />
        ))}
      </WorkspaceAccordionSection>
      <WorkspaceAccordionSection
        sectionTitle="다이렉트 메세지"
        createButtonIcon={<MdOutlineAddBox className="text-2xl" />}
        createButtonText="직장 동류 추가"
        createButtonOnClick={() => setModal('USER_INVITE')}
      >
        {dmList?.dms?.map((dm, index) => (
          <WorkspaceDirectMessageListItem dm={dm} key={index} />
        ))}
      </WorkspaceAccordionSection>
      <ModalManager workspaceName={workspaceName} workspaceId={workspaceId!} />
    </div>
  );
};

export default WorkspaceChannelPanel;

interface ModalManagerProps {
  workspaceName: string;
  workspaceId: string;
}

const ModalManager = ({ workspaceName, workspaceId }: ModalManagerProps) => {
  const { mutate: leaveWorkspace } = useLeaveWorkspaceMutation();
  const { mutate: removeWorkspace } = useRemoveWorkspaceMutation();
  const modal = useModalStore(state => state.modal);
  const closeModal = useModalStore(state => state.closeModal);
  const isOpen = (key: ModalType) => modal === key;

  return (
    <>
      {isOpen('USER_INVITE') && (
        <WorkspaceUserInviteModal
          title={workspaceName}
          closeModal={() => closeModal()}
        />
      )}
      {isOpen('WORKSPACE_DELETE') && (
        <WorkspaceActionModal
          title={`${workspaceName} 삭제하기`}
          onClick={() => {
            closeModal();
            removeWorkspace(workspaceId);
          }}
          onClickButtonName="워크스페이스 삭제하기"
          closeModal={() => closeModal()}
        />
      )}
      {isOpen('WORKSPACE_LEAVE') && (
        <WorkspaceActionModal
          title={`${workspaceName} 나가기`}
          onClick={() => {
            closeModal();
            leaveWorkspace(workspaceId);
          }}
          onClickButtonName="워스크스페이스 나가기"
          closeModal={() => closeModal()}
        />
      )}
    </>
  );
};

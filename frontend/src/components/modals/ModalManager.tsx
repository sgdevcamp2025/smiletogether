import ChannelCreateModal from '@/components/modals/channel/ChannelCreateModal';
import WorkspaceActionModal from '@/components/modals/workspace/WorkspaceActionModal';
import WorkspaceUserInviteModal from '@/components/modals/workspace/WorkspaceUserInviteModal';
import useLeaveWorkspaceMutation from '@/hooks/workspace/useLeaveWorkspaceMutation';
import useRemoveWorkspaceMutation from '@/hooks/workspace/useRemoveWorkspaceMutation';
import { ModalType, useModalStore } from '@/stores/modalStore';

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
      {isOpen('CHANNEL_CREATE') && <ChannelCreateModal />}
    </>
  );
};

export default ModalManager;

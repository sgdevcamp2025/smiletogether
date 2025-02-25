import EmailTagInput from '@/components/common/EmailTagInput';
import ModalPortal from '@/components/common/ModalPortal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useInviteWorkspaceMutation from '@/hooks/workspace/useInviteWorkspaceMutation';
import { useParams } from 'react-router';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import ChannelTagInput from '@/components/common/ChannelTagInput';
import useInviteChannelMutation from '@/hooks/channel/useInviteChannelMutation';

interface WorkspaceUserInviteModalProps {
  title: string;
  closeModal: () => void;
}

const WorkspaceUserInviteModal = ({
  title,
  closeModal,
}: WorkspaceUserInviteModalProps) => {
  const { workspaceId } = useParams();
  const [emails, setEmails] = useState<string[]>([]);
  const [inviteChannel, setInviteChannel] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [customUserIviteMode, setCustomUserIviteMode] = useState(false);
  const { inviteWorkspace } = useInviteWorkspaceMutation();
  const { channelList, isChannelLoading, isChannelError } =
    useWorkspaceChannelListQuery(workspaceId!);
  const { mutate: inviteUserChannels } = useInviteChannelMutation();

  const onCustomUserIviteMode = () => {
    setCustomUserIviteMode(true);
  };

  const handleSubmit = () => {
    if (!workspaceId) {
      alert('워크스페이스 ID가 없습니다.');
      return;
    }

    if (emails.length === 0) {
      alert('초대할 이메일을 입력하세요.');
      return;
    }

    if (!customUserIviteMode) {
      inviteWorkspace(
        { workspaceId: workspaceId, emails },
        {
          onSuccess: () => {
            alert('완료되었습니다.!');
            closeModal();
          },
        }
      );
    } else {
      if (inviteChannel.length === 0) {
        alert('초대할 채널을 입력해주세요');
        return;
      }
      inviteUserChannels(
        {
          emails: emails,
          channels: inviteChannel,
        },
        {
          onSuccess: () => {
            alert('완료되었습니다.');
            closeModal();
          },
        }
      );
    }
  };

  if (!workspaceId) return <p>워크스페이스 ID가 없습니다.</p>;
  if (isChannelLoading) return <p>로딩중입니다.</p>;
  if (isChannelError) return <p>에러입니다.</p>;

  return (
    <ModalPortal>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 max-w-[800px] min-w-[400px] bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-lg font-semibold">{title}(으)로 사용자 초대</h1>
          <Button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 bg-transparent shadow-none hover:bg-yellow-200"
          >
            x
          </Button>
        </div>

        <div className="mt-4 w-full">
          <span className="text-gray-700 text-sm">초대 받을 사람 :</span>
          <div className="mt-2 rounded-md">
            <EmailTagInput
              emails={emails}
              setEmails={setEmails}
              setIsValidEmail={setIsValid}
            />
          </div>
          <span>{isValid && '올바른 이메일 형식이 아닙니다'}</span>
        </div>
        {!customUserIviteMode ? (
          <Button
            className="mt-3 text-blue-600 hover:underline text-sm w-full py-6 bg-gray-100 hover:bg-yellow-200"
            onClick={onCustomUserIviteMode}
          >
            ✨ 초대 사용자 지정
          </Button>
        ) : (
          <div className="mt-4">
            <h3 className="font-bold">채널</h3>
            <p className="text-gray-400 my-1">
              새 멤버는 워크스페이스의 아래 채널과 기본 채널에 자동으로 참여하게
              됩니다.
            </p>
            <ChannelTagInput
              selectedChannels={inviteChannel}
              availableChannels={channelList ?? []}
              setSelectedChannels={setInviteChannel}
            />
          </div>
        )}
        <div className="mt-6 flex justify-between border-t pt-4">
          <Button className="text-blue-500 hover:bg-yellow-200 text-sm bg-transparent shadow-none ">
            🔗 초대 링크 복사
          </Button>
          <Button
            className="text-gray-500 hover:text-gray-700 text-sm font-black bg-gray-100 shadow-none px-6 hover:bg-yellow-200"
            onClick={handleSubmit}
          >
            보내기
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default WorkspaceUserInviteModal;

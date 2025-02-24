import ChannelCreateFirstStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateFirstStepModal';
import ChannelCreateSecondStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateSecondStepModal';
import useCreateChannelMutation from '@/hooks/channel/useCreateChannelMutation';
import { useModalStore } from '@/stores/modalStore';
import { useState } from 'react';
import { useParams } from 'react-router';

const ChannelCreateModal = () => {
  const [step, setStep] = useState(1);
  const [channelName, setChannelName] = useState('');
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [emails, setEmails] = useState<string[]>([]);
  const { workspaceId } = useParams();
  const { createChannel } = useCreateChannelMutation(workspaceId ?? '');
  const closeModla = useModalStore(state => state.closeModal);

  const handleNewChannelSubmit = () => {
    createChannel(
      {
        workspaceId: workspaceId ?? '',
        name: channelName,
        isPrivate: channelVisibility,
        emails,
      },
      {
        onSuccess: () => {
          alert(`${channelName} 채널 생성에 하셨습니다.`);
        },
        onError: () => {
          alert(`${channelName} 채널 생성에 실패하였습니다. `);
        },
      }
    );
    closeModla();
  };

  const render = () => {
    switch (step) {
      case 1:
        return (
          <ChannelCreateFirstStepModal
            channelName={channelName}
            setStep={setStep}
            setChannelName={setChannelName}
            setChannelVisibility={setChannelVisibility}
          />
        );

      case 2:
        return (
          <ChannelCreateSecondStepModal
            channelName={channelName}
            emails={emails}
            setEmails={setEmails}
            onSubmit={handleNewChannelSubmit}
          />
        );

      default:
        break;
    }
  };
  return <>{render()}</>;
};

export default ChannelCreateModal;

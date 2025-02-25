import ChannelCreateFirstStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateFirstStepModal';
import ChannelCreateSecondStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateSecondStepModal';
import useCreateChannelMutation from '@/hooks/channel/useCreateChannelMutation';
import { useModalStore } from '@/stores/modalStore';
import { useState } from 'react';

const ChannelCreateModal = () => {
  const [step, setStep] = useState(1);
  const [channelName, setChannelName] = useState('');
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [emails, setEmails] = useState<string[]>([]);
  const { createChannel } = useCreateChannelMutation();
  const closeModla = useModalStore(state => state.closeModal);

  const handleNewChannelSubmit = () => {
    createChannel(
      {
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

import ChannelCreateFirstStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateFirstStepModal';
import ChannelCreateSecondStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateSecondStepModal';
import useCreateChannelMutation from '@/hooks/channel/useCreateChannelMutation';
import { useModalStore } from '@/stores/modalStore';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const ChannelCreateModal = () => {
  const [step, setStep] = useState(1);
  const [channelName, setChannelName] = useState('');
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [emails, setEmails] = useState<string[]>([]);
  const { workspaceId } = useParams();
  const { createChannel } = useCreateChannelMutation(workspaceId!);
  const closeModla = useModalStore(state => state.closeModal);
  const naviagate = useNavigate();

  const handleNewChannelSubmit = () => {
    if (!workspaceId) {
      alert('워크스페이스 접근 오류');
      naviagate('/workspaces');
      return;
    }
    createChannel({
      workspaceId,
      name: channelName,
      isPrivate: channelVisibility,
      emails,
    });
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

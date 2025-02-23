import ChannelCreateFirstStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateFirstStepModal';
import ChannelCreateSecondStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateSecondStepModal';
import useCreateChannelMutation from '@/hooks/channel/useCreateChannelMutation';
import { useState } from 'react';
import { useParams } from 'react-router';

const ChannelCreateModal = () => {
  const [step, setStep] = useState(1);
  const [channelName, setChannelName] = useState('');
  const [channelVisibility, setChannelVisibility] = useState(true);
  const [emails, setEmails] = useState<string[]>([]);
  const { workspaceId } = useParams();
  const { mutate } = useCreateChannelMutation(workspaceId ?? '');

  const handleNewChannelSubmit = () => {
    mutate({
      workspaceId: workspaceId ?? '',
      name: channelName,
      isPrivate: channelVisibility,
      emails,
    });
  };

  const render = () => {
    switch (step) {
      case 1:
        return (
          <ChannelCreateFirstStepModal
            channelVisibility={channelVisibility}
            channelName={channelName}
            setStep={setStep}
            setChannelName={setChannelName}
            setChannelVisibility={setChannelVisibility}
          />
        );

      case 2:
        return (
          <ChannelCreateSecondStepModal
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

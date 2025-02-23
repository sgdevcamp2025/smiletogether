import ChannelCreateFirstStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateFirstStepModal';
import ChannelCreateSecondStepModal from '@/components/modals/channel/ChannelCreateModal/ChannelCreateSecondStepModal';
import { useState } from 'react';

const ChannelCreateModal = () => {
  const [step, setStep] = useState(1);
  const [channelName, setChannelName] = useState('');
  const [channelVisibility, setChannelVisibility] = useState('public');
  const [emails, setEmails] = useState<string[]>([]);

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
          <ChannelCreateSecondStepModal emails={emails} setEmails={setEmails} />
        );

      default:
        break;
    }
  };
  return <>{render()}</>;
};

export default ChannelCreateModal;

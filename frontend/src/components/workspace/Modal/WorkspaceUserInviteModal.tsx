import EmailTagInput from '@/components/common/EmailTagInput';
import ModalPortal from '@/components/common/ModalPortal';
import { useState } from 'react';

const WorkspaceUserInviteModal = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  return (
    <ModalPortal>
      <EmailTagInput
        emails={emails}
        setEmails={setEmails}
        setIsValidEmail={setIsValid}
      />
    </ModalPortal>
  );
};

export default WorkspaceUserInviteModal;

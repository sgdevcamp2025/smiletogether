import EmailTagInput from '@/components/common/EmailTagInput';
import ModalPortal from '@/components/common/ModalPortal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface WorkspaceUserInviteModalProps {
  title: string;
  closeModal: () => void;
}

const WorkspaceUserInviteModal = ({
  title,
  closeModal,
}: WorkspaceUserInviteModalProps) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  return (
    <ModalPortal>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-lg font-semibold">{title}(으)로 사용자 초대</h1>
          <Button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            x
          </Button>
        </div>

        <div className="mt-4">
          <span className="text-gray-700 text-sm">초대 받을 사람 :</span>
          <div className="mt-2 border rounded-md p-2">
            <EmailTagInput
              emails={emails}
              setEmails={setEmails}
              setIsValidEmail={setIsValid}
            />
          </div>
          <Button className="mt-3 text-blue-600 hover:underline text-sm">
            ✨ 초대 사용자 지정
          </Button>
        </div>

        <div className="mt-6 flex justify-between border-t pt-4">
          <Button className="text-blue-500 hover:underline text-sm">
            🔗 초대 링크 복사
          </Button>
          <Button className="text-gray-500 hover:text-gray-700 text-sm">
            🔧 링크 설정 편집
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default WorkspaceUserInviteModal;

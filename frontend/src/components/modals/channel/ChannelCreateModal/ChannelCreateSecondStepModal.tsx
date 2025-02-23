import XButton from '@/components/common/button/XButton';
import EmailTagInput from '@/components/common/EmailTagInput';
import ModalPortal from '@/components/common/ModalPortal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useModalStore } from '@/stores/modalStore';
import RadioButton from '@/components/common/button/RadioButton';
import SkipButton from '@/components/common/button/SkipButton';

const ChannelCreateSecondStepModal = ({
  emails,
  setEmails,
  onSubmit,
}: {
  emails: string[];
  setEmails: (emails: string[]) => void;
  onSubmit: () => void;
}) => {
  const [isValid, setIsValid] = useState(false);
  const [totalUserInvite, setTotalUserInvite] = useState('');
  const closeModla = useModalStore(state => state.closeModal);
  return (
    <ModalPortal>
      <div className="bg-white w-full p-4 max-w-md max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-end">
          <span>#채널명에 사용자 추가</span>
          <XButton onClick={closeModla} />
        </div>
        <div>
          <RadioButton
            id="total"
            name="channel_user_invite_mode"
            value="total"
            children={`채널의 모든 멤버 추가`}
            onChange={e => {
              setTotalUserInvite(e.target.value);
            }}
            defaultChecked={true}
          />
          <RadioButton
            id="partial"
            name="channel_user_invite_mode"
            value="partial"
            children={'특정 사용자 추가'}
            onChange={e => {
              setTotalUserInvite(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col items-end">
          {totalUserInvite ? (
            <>
              <EmailTagInput
                emails={emails}
                setEmails={setEmails}
                setIsValidEmail={setIsValid}
                className="w-full"
              />
              {isValid && <div>잘못된 이메일 형식입니다.</div>}
              <SkipButton
                onClick={() => {
                  closeModla();
                  onSubmit();
                }}
              />
            </>
          ) : (
            <Button
              onClick={() => {
                closeModla();
                onSubmit();
              }}
            >
              추가
            </Button>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default ChannelCreateSecondStepModal;

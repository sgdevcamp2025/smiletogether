import { useState } from 'react';
import { useParams } from 'react-router';
import { useModalStore } from '@/stores/modalStore';
import useUserWorkspaceQuery from '@/hooks/workspace/useUserWorkspaceQuery';
import { Button } from '@/components/ui/button';
import XButton from '@/components/common/button/XButton';
import EmailTagInput from '@/components/common/EmailTagInput';
import ModalPortal from '@/components/common/ModalPortal';
import RadioButton from '@/components/common/button/RadioButton';
import SkipButton from '@/components/common/button/SkipButton';

const ChannelCreateSecondStepModal = ({
  channelName,
  emails,
  setEmails,
  onSubmit,
}: {
  channelName: string;
  emails: string[];
  setEmails: (emails: string[]) => void;
  onSubmit: () => void;
}) => {
  const [isValid, setIsValid] = useState(false);
  const [totalUserInvite, setTotalUserInvite] = useState('total');
  const closeModla = useModalStore(state => state.closeModal);
  const { workspaceId } = useParams();
  const { data: workspacesInfo } = useUserWorkspaceQuery(workspaceId!);

  return (
    <ModalPortal>
      <div className="bg-white w-full p-4 max-w-md max-h-[80vh] overflow-auto">
        <div className="flex  items-center justify-between">
          <span className="text-xl py-2">#{channelName}에 사용자 추가</span>
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
              setEmails(
                workspacesInfo?.users.map(user => user.userEmail) || []
              );
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
              setEmails([]);
            }}
          />
        </div>

        <div className="flex flex-col items-end">
          {totalUserInvite === 'partial' ? (
            <>
              <EmailTagInput
                emails={emails}
                setEmails={setEmails}
                setIsValidEmail={setIsValid}
                className="w-full"
              />
              {isValid && <div>잘못된 이메일 형식입니다.</div>}
              <div className="flex">
                {emails.length > 0 && (
                  <Button
                    className="bg-transparent text-black hover:bg-white"
                    onClick={onSubmit}
                  >
                    추가
                  </Button>
                )}
                <SkipButton className="hover:bg-white" onClick={onSubmit} />
              </div>
            </>
          ) : (
            <Button className="bg-transparent text-black" onClick={onSubmit}>
              추가
            </Button>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default ChannelCreateSecondStepModal;

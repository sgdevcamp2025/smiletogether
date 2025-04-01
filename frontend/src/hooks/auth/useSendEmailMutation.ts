import { postSendEmailCode } from '@/apis/user';
import { useMutation } from '@tanstack/react-query';

export const useSendEmailMutation = () => {
  const { mutate: sendEmail, isPending: sendEmailIsPending } = useMutation({
    mutationFn: postSendEmailCode,
  });
  return { sendEmail, sendEmailIsPending };
};

import { postConfirmEmail, postSendEmailCode } from '@/apis/user';
import { useMutation } from '@tanstack/react-query';

export const useSendEmailMutation = () => {
  return useMutation({
    mutationFn: postSendEmailCode,
  });
};

export const useConfirmEmailMutation = () => {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      postConfirmEmail(email, code),
  });
};

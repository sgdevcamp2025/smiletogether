import { postLogin, postSignIn, postSignUp } from '@/apis/user';
import { useMutation } from '@tanstack/react-query';

export const useSignInMutation = () =>
  useMutation({
    mutationFn: postSignIn,
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: postSignUp,
  });

export const useLoginMutation = () =>
  useMutation({
    mutationFn: postLogin,
  });

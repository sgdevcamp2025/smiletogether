import { FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import EmailVerificationSection from '@/components/login/EmailVerificationSection';
import NickNameSettingSection from '@/components/login/NickNameSettingSection';
import {
  useSignInMutation,
  useSignUpMutation,
} from '@/hooks/auth/useAuthMutations';
import { useConfirmEmailMutation } from '@/hooks/auth/useEmailMutation';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/use-toast';

const ConfirmEmailPage = () => {
  const location = useLocation();
  const [code, setCode] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const signUp = useSignUpMutation();
  const signIn = useSignInMutation();
  const confirmEmail = useConfirmEmailMutation();
  const { handleLogin } = useAuth();

  const { toast } = useToast();

  const email = location.state?.email;

  const submitInput = async () => {
    if (!email) {
      toast({
        title: '이메일을 입력해주세요',
      });
      return;
    }

    try {
      const confirmResponse = await confirmEmail.mutateAsync({ email, code });
      if (confirmResponse.code === '400')
        throw new Error(confirmResponse.message);
      if (confirmResponse.code === '200') {
        const { isMember, member } = await signIn.mutateAsync(email);
        if (isMember === false) setIsRegistering(true);
        else await handleLogin(member);
      }
    } catch (error) {
      toast({
        title: `코드 확인에 실패했습니다. ${error}`,
      });
      return;
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name'));
    try {
      await signUp.mutateAsync({ username: name, email });
      const { member } = await signIn.mutateAsync(email);
      await handleLogin(member);
    } catch (error) {
      toast({
        title: `회원가입에 실패했습니다. ${error}`,
      });
    }
  };

  useEffect(() => {
    if (code.length === 6) submitInput();
  }, [code]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-2xl font-bold text-zinc-950 mb-8">smileTogether</div>
      <div className="w-full max-w-md space-y-6">
        {!isRegistering ? (
          <EmailVerificationSection code={code} setCode={setCode} />
        ) : (
          <NickNameSettingSection
            email={email}
            handleRegister={handleRegister}
          />
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailPage;

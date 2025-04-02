import { InputNicknameForm } from '@/components/login/InputNicknameForm';
import { FormEvent } from 'react';

const NickNameSettingSection = ({
  email,
  handleRegister,
}: {
  email: string;
  handleRegister: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-zinc-950">
          닉네임을 입력해주세요
        </h1>
        <p className="text-sm text-zinc-500">
          닉네임만 입력하면 회원가입이 끝나요!
        </p>
      </div>
      <InputNicknameForm
        onSubmit={handleRegister}
        placeholder={email?.split('@')[0] || email}
      />
    </>
  );
};

export default NickNameSettingSection;

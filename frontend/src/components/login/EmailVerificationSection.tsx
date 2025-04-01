import { InputCodeForm } from '@/components/login/InputCodeForm';
import { Dispatch, SetStateAction } from 'react';

const EmailVerificationSection = ({
  code,
  setCode,
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-zinc-950">
          코드는 이메일에서 확인하세요
        </h1>
        <p className="text-sm text-zinc-500">
          코드는 잠시 후에 만료되니 서둘러 입력하세요.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <InputCodeForm code={code} setCode={setCode} />
      </div>
    </>
  );
};

export default EmailVerificationSection;

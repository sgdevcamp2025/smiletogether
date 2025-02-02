import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useState } from 'react';

const ConfirmEmailPage = () => {
  const [code, setCode] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-2xl font-bold text-zinc-950 mb-8">smileTogether</div>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-zinc-950">
            코드는 이메일에서 확인하세요
          </h1>
          <p className="text-sm text-zinc-500">
            코드는 잠시 후에 만료되니 서둘러 입력하세요.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <InputOTP maxLength={6} value={code} onChange={code => setCode(code)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;

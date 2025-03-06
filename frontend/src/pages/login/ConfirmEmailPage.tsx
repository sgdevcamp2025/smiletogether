import { postLogin } from '@/apis/user';
import { InputCodeForm } from '@/components/login/InputCodeForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ConfirmEmailPage = () => {
  const [code, setCode] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await postLogin('test3');
  };
  useEffect(() => {
    if (code.length === 6) {
      try {
        handleLogin();
        navigate('/workspaces');
      } catch (e) {
        alert('로그인 실패');
      }
    }
  }, [code]);

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
          <InputCodeForm code={code} setCode={setCode} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;

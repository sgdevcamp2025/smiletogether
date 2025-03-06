import { postConfirmEmail, postLogin } from '@/apis/user';
import { InputCodeForm } from '@/components/login/InputCodeForm';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState<string>('');

  const email = location.state?.email;

  const handleLogin = async () => {
    if (email) {
      const response = await postConfirmEmail(email, code);

      if (response.data.code === '400') {
        alert(response.data.message);
        return;
      }

      if (response.data.code === '200') {
        const response = await postLogin(email);
        console.log(response.data);
        return;
      }
    } else {
      alert('이메일을 다시 전송해주세요.');
      navigate('/');
    }
  };
  useEffect(() => {
    if (code.length === 6) {
      try {
        handleLogin();
        //navigate('/workspaces');
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

import { postConfirmEmail, postLogin, postRegister } from '@/apis/user';
import { InputCodeForm } from '@/components/login/InputCodeForm';
import { InputNicknameForm } from '@/components/login/InputNicknameForm';
import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const email = location.state?.email;

  const handleLogin = async () => {
    if (!email) {
      alert('이메일을 다시 전송해주세요.');
      navigate('/');
      return;
    }

    const confirmResponse = await postConfirmEmail(email, code);

    if (confirmResponse.data.code === '400') {
      alert(confirmResponse.data.message);
      return;
    }

    if (confirmResponse.data.code === '200') {
      const loginResponse = await postLogin(email);
      alert('성공');
      if (loginResponse.data.isMember === false) {
        setIsRegistering(true);
      } else {
        navigate('/workspaces');
      }
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    try {
      const registerResponse = await postRegister(name, email);
      navigate('/workspaces');
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      try {
        handleLogin();
      } catch (e) {
        alert('로그인 실패');
      }
    }
  }, [code]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-2xl font-bold text-zinc-950 mb-8">smileTogether</div>
      <div className="w-full max-w-md space-y-6">
        {!isRegistering ? (
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailPage;

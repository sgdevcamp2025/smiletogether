import { postSendEmailCode } from '@/apis/user';
import ModalPortal from '@/components/common/ModalPortal';
import { LoginForm } from '@/components/login/LoginForm';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //이메일 전송
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    try {
      setIsLoading(true);
      await postSendEmailCode(email);
      navigate('/confirmemail', { state: { email: email } });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert('이메일 전송에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-2xl font-bold text-zinc-950 mb-8">smileTogether</div>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          {isLoading && (
            <ModalPortal>
              <div className=" min-w-64 min-h-48 bg-white text-black flex flex-col items-center justify-center p-5 rounded-lg shadow-lg">
                <div className="w-16 h-16 border-8 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
                <p className="mt-3 text-lg font-medium">이메일 전송 중...</p>
              </div>
            </ModalPortal>
          )}
          <h1 className="text-3xl font-bold text-zinc-950">
            먼저 이메일부터 입력해 보세요
          </h1>
          <p className="text-sm text-zinc-500">
            직장에서 사용하는 이메일 주소로 로그인하는 걸 추천드려요.
          </p>
        </div>
        <LoginForm onSubmit={handleEmailSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;

import { postSendEmailCode } from '@/apis/user';
import { LoginForm } from '@/components/login/LoginForm';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //이메일 전송
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    try {
      await postSendEmailCode(email);
      console.log('이메일 전송 성공', email);
      navigate('/confirmemail', { state: { email: email } });
    } catch (error) {
      console.error('이메일 전송 실패', error);
      alert('이메일 전송에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-2xl font-bold text-zinc-950 mb-8">smileTogether</div>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
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

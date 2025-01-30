import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginPage = () => {
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
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="name@work-email.com"
            className="w-full px-3 py-2 border rounded-md"
          />
          <Button className="w-full bg-amber-300 hover:bg-rose-200 text-white py-2 rounded-md">
            계속
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

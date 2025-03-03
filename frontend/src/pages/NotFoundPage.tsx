import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <span className="text-8xl">404 Not Found</span>
      <Button
        className="m-5"
        onClick={() => {
          navigate('/workspaces');
        }}
      >
        홈으로 이동하기
      </Button>
    </div>
  );
};

export default NotFoundPage;

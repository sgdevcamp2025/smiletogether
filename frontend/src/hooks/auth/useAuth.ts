import { useLoginMutation } from '@/hooks/auth/useAuthMutations';
import { userOriginStore } from '@/stores/userOriginStore';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router';

export const useAuth = () => {
  const { setUser: setOriginUser } = userOriginStore();
  const { setUser } = useUserStore();

  const login = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (member: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }) => {
    await login.mutateAsync(member.id).then(({ accessToken }) => {
      if (accessToken) localStorage.setItem('access-token', accessToken);
      else {
        alert('accessToken 발급 실패');
        return;
      }
      const userInfo = member;
      setOriginUser(userInfo);
      setUser({
        userId: userInfo.id,
      });
      // toast로 대체
      alert('성공');
      navigate('/workspaces');
    });
  };

  return { handleLogin };
};

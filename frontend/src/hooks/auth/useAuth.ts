import { useNavigate } from 'react-router';
import { userOriginStore } from '@/stores/userOriginStore';
import { useUserStore } from '@/stores/userStore';
import { useLoginMutation } from '@/hooks/auth/useAuthMutations';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const { setUser: setOriginUser } = userOriginStore();
  const { setUser } = useUserStore();
  const { toast } = useToast();

  const login = useLoginMutation();
  const navigate = useNavigate();

  const loginWithMember = async (member: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }) => {
    await login.mutateAsync(member.id).then(({ accessToken }) => {
      if (accessToken) localStorage.setItem('access-token', accessToken);
      else {
        toast({ title: 'accessToken 발급 실패' });
        return;
      }
      const userInfo = member;
      setOriginUser(userInfo);
      setUser({
        userId: userInfo.id,
      });
      toast({
        title: `로그인 성공`,
      });
      navigate('/workspaces');
    });
  };

  return { loginWithMember };
};

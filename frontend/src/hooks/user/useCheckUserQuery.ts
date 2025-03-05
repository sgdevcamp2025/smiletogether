import { getValidateAccessToken } from '@/apis/user';
import { useQuery } from '@tanstack/react-query';

const useCheckUserQuery = () => {
  return useQuery({
    queryKey: ['userCheck'],
    queryFn: getValidateAccessToken,
    retry: 0,
    gcTime: 0,
    staleTime: 0,
  });
};

export default useCheckUserQuery;

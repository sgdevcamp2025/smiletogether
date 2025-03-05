import React, { useEffect } from 'react';
import { Suspense } from 'react';
import useCheckUserQuery from '@/hooks/user/useCheckUserQuery';
import { useNavigate } from 'react-router';

interface UserGuardProps {
  children: React.ReactNode;
}

export const UserGuard = ({ children }: UserGuardProps) => {
  const accessTocken = localStorage.getItem('access-token');
  const navigate = useNavigate();
  if (!accessTocken) navigate('/');
  const { data, isError, isLoading } = useCheckUserQuery();

  useEffect(() => {
    if (isLoading) return;
    if (data && data.userId) {
      console.log('userId', data.userId);
    }
  }, [isError, data]);
  return <Suspense>{children}</Suspense>;
};

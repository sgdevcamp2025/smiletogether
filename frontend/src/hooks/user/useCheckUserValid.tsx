import React, { useEffect } from 'react';
import { Suspense } from 'react';
import { useNavigate } from 'react-router';

interface UserGuardProps {
  children: React.ReactNode;
}

export const UserGuard = ({ children }: UserGuardProps) => {
  const accessTocken = localStorage.getItem('access-token');
  const navigate = useNavigate(); //   const { data, isError, isLoading } = useCheckUserQuery();

  useEffect(() => {
    if (!accessTocken) navigate('/');
  }, []);
  return <Suspense>{children}</Suspense>;
};

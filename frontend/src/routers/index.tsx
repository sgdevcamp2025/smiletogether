import ConfirmEmailPage from '@/pages/login/ConfirmEmailPage';
import LoginPage from '@/pages/login/LoginPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/confirmemail',
    element: <ConfirmEmailPage />,
  },
]);

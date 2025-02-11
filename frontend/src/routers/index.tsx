import { createBrowserRouter } from 'react-router-dom';
import ConfirmEmailPage from '@/pages/login/ConfirmEmailPage';
import LoginPage from '@/pages/login/LoginPage';
import MainFrame from '@/components/Frame/MainFrame';
import WorkSpaceListPage from '@/pages/workspace/WorkspaceListPage';
import DMPage from '@/pages/dm/DMPage';
import ChannelPage from '@/pages/channel/ChannelPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/confirmemail',
    element: <ConfirmEmailPage />,
  },
  {
    path: '/workspaces',
    element: <WorkSpaceListPage />,
  },
  { path: '/dm', element: <DMPage /> },
  { path: '/client/:workspaceId/:channelId', element: <ChannelPage /> },
  {
    element: <MainFrame />,
    children: [
      {
        path: '/workspace/create',
        element: <div>dadasss</div>,
      },
      {
        path: `/client/:workspaceID`,
      },
    ],
  },
]);

import { createBrowserRouter } from 'react-router-dom';
import DMPage from '@/pages/dm/DMPage';
import LoginPage from '@/pages/login/LoginPage';
import WorkspaceFrame from '@/components/frame/workspace/WorkspaceFrame';
import ConfirmEmailPage from '@/pages/login/ConfirmEmailPage';
import WorkSpaceListPage from '@/pages/workspace/WorkspaceListPage';
import WorkspaceDashboard from '@/components/workspace/WorkspaceDashboard';
import WorkspaceCreationProcess from '@/components/workspace/WorkspaceCreationProcess';
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
    element: <WorkspaceFrame />,
    children: [
      {
        path: '/workspace/create',
        element: <WorkspaceCreationProcess />,
      },
      {
        path: `/workspace/:workspaceID`,
        element: <WorkspaceDashboard />,
      },
    ],
  },
]);

import { createBrowserRouter } from 'react-router-dom';
import DMPage from '@/pages/dm/DMPage';
import LoginPage from '@/pages/login/LoginPage';
import WorkspaceFrame from '@/components/frame/workspace/WorkspaceFrame';
import ConfirmEmailPage from '@/pages/login/ConfirmEmailPage';
import WorkSpaceListPage from '@/pages/workspace/WorkspaceListPage';
import WorkspaceCreationProcess from '@/components/workspace/WorkspaceCreationProcess';
import ChannelPage from '@/pages/channel/ChannelPage';
import ActivityPage from '@/pages/activity/ActivityPage';

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

  {
    path: '/workspace/create',
    element: <WorkspaceCreationProcess />,
  },
  {
    path: '/workspace/:workspaceID',
    element: <WorkspaceFrame />,
    children: [
      {
        path: '',
        element: <ChannelPage />,
      },
      {
        path: 'dm',
        element: <DMPage />,
      },
      {
        path: 'activity',
        element: <ActivityPage />,
      },
      { path: 'channel/:channelId', element: <ChannelPage /> },
    ],
  },
]);

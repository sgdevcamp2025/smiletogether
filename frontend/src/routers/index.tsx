import { createBrowserRouter } from 'react-router-dom';
import DMPage from '@/pages/dm/DMPage';
import LoginPage from '@/pages/login/LoginPage';
import WorkspaceFrame from '@/components/frame/workspace/WorkspaceFrame';
import ConfirmEmailPage from '@/pages/login/ConfirmEmailPage';
import WorkSpaceListPage from '@/pages/workspace/WorkspaceListPage';
import WorkspaceCreationProcess from '@/components/workspace/WorkspaceCreationProcess';
import ChannelPage from '@/pages/channel/ChannelPage';
import ActivityPage from '@/pages/activity/ActivityPage';
import WorkspaceChannelPanel from '@/components/workspace/WorkspaceChannelPanel';
import SplitPaneLayout from '@/components/common/SplitPaneLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import WorkspaceJoinPage from '@/pages/workspace/WorkspaceJoinPage';

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
    path: '/workspace/invite/:workspaceId',
    element: <WorkspaceJoinPage />,
  },
  {
    path: '/workspace/:workspaceId',
    element: <WorkspaceFrame />,
    children: [
      {
        path: '',
        element: (
          <SplitPaneLayout
            leftPannelDefaultSize={30}
            rightPannelDefaultSize={70}
            children1={<WorkspaceChannelPanel />}
            children2={<ChannelPage />}
          />
        ),
      },
      {
        path: 'dm/:dmId',
        element: <DMPage />,
      },
      {
        path: 'activity',
        element: <ActivityPage />,
      },
      {
        path: 'channel/:channelId',
        element: (
          <SplitPaneLayout
            leftPannelDefaultSize={30}
            rightPannelDefaultSize={70}
            children1={<WorkspaceChannelPanel />}
            children2={<ChannelPage />}
          />
        ),
      },
    ],
  },
  {
    path: '/*',
    element: <NotFoundPage />,
  },
]);

import { createBrowserRouter } from 'react-router-dom';
import WorkspaceFrame from '@/components/frame/workspace/WorkspaceFrame';
import WorkSpaceListPage from '@/pages/workspace/WorkspaceListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div className="text-red-400">홈 입니다</div>,
  },
  {
    path: '/workspaces',
    element: <WorkSpaceListPage />,
  },
  {
    element: <WorkspaceFrame />,
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

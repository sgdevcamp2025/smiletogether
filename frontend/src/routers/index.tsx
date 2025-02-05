import { createBrowserRouter } from 'react-router-dom';
import MainFrame from '@/components/Frame/MainFrame';
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

import DMPage from '@/pages/dm/DMPage';
import { WorkSpaceListPage } from '@/pages/workspace/WorkspaceListPage';
import { createBrowserRouter } from 'react-router-dom';

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
    path: '/dm',
    element: <DMPage />,
  },
]);

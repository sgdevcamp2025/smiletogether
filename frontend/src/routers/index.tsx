import { WorkSpaceListPage } from '@/pages/workspace/WorkSpaceListPage';
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
]);

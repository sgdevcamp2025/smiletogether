import { useEffect } from 'react';
import { useParams } from 'react-router';
import currentFrameState from '@/stores/currentFrameState.store';

const WorkspaceDashboard = () => {
  const { setCurrentPage } = currentFrameState();
  const params = useParams();

  useEffect(() => {
    setCurrentPage('workspace');
    // eslint-disable-next-line no-console
    console.log('params', params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>ㅇㅇ</div>;
};

export default WorkspaceDashboard;

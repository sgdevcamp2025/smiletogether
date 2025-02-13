import { JSX } from 'react/jsx-runtime';
import { useEffect } from 'react';
import StepSetWorkspaceName from '@/components/workspace/WorkspaceCreationProcess/StepSetWorkspaceName';
import StepSetUserName from '@/components/workspace/WorkspaceCreationProcess/StepSetUserName';
import StepSetInviteUsers from '@/components/workspace/WorkspaceCreationProcess/StepSetInviteUsers';
import { stepData } from '@/lib/workspace';
import { useWorkspaceCreationStore } from '@/stores/workspace';
import currentFrameState from '@/stores/currentFrameState';

const WorkspaceCreationProcess = () => {
  const { step, workspaceName } = useWorkspaceCreationStore();
  const { setCurrentPage } = currentFrameState();

  useEffect(() => {
    setCurrentPage('create');
  }, [setCurrentPage]);

  const workspaceProcessComponents: Record<number, JSX.Element> = {
    1: <StepSetWorkspaceName />,
    2: <StepSetUserName />,
    3: <StepSetInviteUsers />,
  };
  const currentStep = stepData[step];
  return (
    <div className="mx-20 mt-20">
      <span className="text-gray-400">{step}/3 단계</span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-800 lg:text-5xl">
        {typeof currentStep.title === 'function'
          ? currentStep.title(workspaceName)
          : currentStep.title}
      </h1>
      <p className="mt-8">{currentStep.description}</p>
      {workspaceProcessComponents[step]}
    </div>
  );
};

export default WorkspaceCreationProcess;

import { JSX } from 'react/jsx-runtime';
import { NAVIGATION_ICONS } from '@/constants/navItems';
import WorkspaceHeader from '@/components/frame/workspace/WorkspaceHeader';
import StepSetUserName from '@/components/workspace/WorkspaceCreationProcess/StepSetUserName';
import StepSetInviteUsers from '@/components/workspace/WorkspaceCreationProcess/StepSetInviteUsers';
import WorkspaceIconButton from '@/components/workspace/WorkspaceIconButton';
import StepSetWorkspaceName from '@/components/workspace/WorkspaceCreationProcess/StepSetWorkspaceName';
import { stepData } from '@/lib/workspace';
import { useWorkspaceCreationStore } from '@/stores/workspace';

const WorkspaceCreationProcess = () => {
  const { step, workspaceName } = useWorkspaceCreationStore();
  const name = workspaceName ? workspaceName[0].toUpperCase() : 'W';

  const filterdIcons = Object.values(NAVIGATION_ICONS).filter(
    item => item.label === '홈' || item.label === '더보기'
  );
  const workspaceProcessComponents: Record<number, JSX.Element> = {
    1: <StepSetWorkspaceName />,
    2: <StepSetUserName />,
    3: <StepSetInviteUsers />,
  };
  const currentStep = stepData[step];
  return (
    <div className="flex h-screen flex-col w-full">
      <WorkspaceHeader />
      <div className="flex flex-1">
        <div className=" min-w-16 bg-yellow-400 text-white flex py-2 flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-semibold">{name}</span>
          </div>
          {filterdIcons.map((item, index) => {
            return (
              <WorkspaceIconButton key={index} className="bg-transparent">
                {item.icon}
                <span>{item.label}</span>
              </WorkspaceIconButton>
            );
          })}
        </div>

        <div className="w-80 bg-yellow-200 "></div>
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
      </div>
    </div>
  );
};

export default WorkspaceCreationProcess;

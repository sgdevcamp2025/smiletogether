import { useParams } from 'react-router';
import { MdOutlineAddBox } from 'react-icons/md';
import WorkspaceAccordionSection from '@/components/workspace/WorkspaceAccordionList';
import WorkspaceChannelListItem from '@/components/workspace/WorkspaceChannelPanel/WorkspaceChannelListItem';
import WorkspaceDirectMessageListItem from '@/components/workspace/WorkspaceChannelPanel/WorkspaceDirectMessageListItem';
import useUserWorkspaceQuery from '@/hooks/workspace/useUserWorkspaceQuery';
import useWorkspaceChannelListQuery from '@/hooks/channel/useWorkspaceChannelListQuery';
import useGetDMListQuery from '@/hooks/dm/useGetDMListQuery';
import { useState } from 'react';
import WorkspaceUserInviteModal from '@/components/workspace/Modal/WorkspaceUserInviteModal';

const WorkspaceChannelPanel = () => {
  const { workspaceID } = useParams();
  const [onModal, setOnModal] = useState(false);

  const {
    data: workspacesInfo,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useUserWorkspaceQuery(workspaceID!);
  const {
    data: dmList,
    isLoading: isDMLoading,
    isError: isDMError,
  } = useGetDMListQuery(workspaceID!);

  const {
    data: channelList = [],
    isLoading: isChannelLoading,
    isError: isChannelError,
  } = useWorkspaceChannelListQuery(workspaceID!);

  if (isChannelLoading || isWorkspaceLoading || isDMLoading)
    return <p>로딩 중입니다!</p>;
  if (isChannelError || isWorkspaceError || isDMError)
    return <p>에러가 발생했습니다!</p>;

  const openAddColleagueModal = () => {
    setOnModal(true);
  };

  const offAddColleagueModal = () => {
    setOnModal(false);
  };

  return (
    <div className=" min-w-16 bg-yellow-200 text-white flex py-2 flex-col gap-2 text-wrap h-screen">
      <h2 className="mt-3 px-4 scroll-m-20 text-2xl font-semibold tracking-tight text-white">
        {workspacesInfo?.name}
      </h2>
      <WorkspaceAccordionSection
        sectionTitle="채널"
        createButtonIcon={<MdOutlineAddBox />}
        createButtonText="채널 추가"
      >
        {channelList?.map((channel, index) => (
          <WorkspaceChannelListItem channel={channel} key={index} />
        ))}
      </WorkspaceAccordionSection>
      <WorkspaceAccordionSection
        sectionTitle="다이렉트 메세지"
        createButtonIcon={<MdOutlineAddBox className="text-2xl" />}
        createButtonText="직장 동류 추가"
        createButtonOnClick={openAddColleagueModal}
      >
        {dmList?.dms?.map((dm, index) => (
          <WorkspaceDirectMessageListItem dm={dm} key={index} />
        ))}
      </WorkspaceAccordionSection>
      {onModal && (
        <WorkspaceUserInviteModal
          title={workspacesInfo?.name ?? ''}
          closeModal={offAddColleagueModal}
        />
      )}
    </div>
  );
};

export default WorkspaceChannelPanel;

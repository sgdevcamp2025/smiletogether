import WorkspaceAccordionSection from '@/components/workspace/WorkspaceAccordionList';
import WorkspaceChannelListItem from '@/components/workspace/WorkspaceChannelPanel/WorkspaceChannelListItem';
import { getWorkspaceChannelsResponseDto } from '@/apis/channel/dto';
import ChannelMenu from '@/components/channel/ChannelMenu';

interface WorkspaceAccordionSectionProps {
  onCreateChannel: () => void;
  onExploreChannels: () => void;
  channelList: getWorkspaceChannelsResponseDto[];
}

const WorkspaceChannels = ({
  onCreateChannel,
  onExploreChannels,
  channelList,
}: WorkspaceAccordionSectionProps) => {
  return (
    <WorkspaceAccordionSection sectionTitle="채널">
      {channelList?.map((channel, index) => (
        <WorkspaceChannelListItem channel={channel} key={index} />
      ))}
      <ChannelMenu
        onCreateChannel={onCreateChannel}
        onExploreChannels={onExploreChannels}
      />
    </WorkspaceAccordionSection>
  );
};

export default WorkspaceChannels;

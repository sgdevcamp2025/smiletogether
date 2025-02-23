import { DMItem } from '@/apis/dm/dto';
import { Button } from '@/components/ui/button';
import WorkspaceAccordionSection from '@/components/workspace/WorkspaceAccordionList';
import WorkspaceDirectMessageListItem from '@/components/workspace/WorkspaceChannelPanel/WorkspaceDirectMessageListItem';
import { MdOutlineAddBox } from 'react-icons/md';

interface WorkspaceDMsProps {
  dmList: DMItem[];
  onAddColleauge: () => void;
}

const WorkspaceDMs = ({ dmList, onAddColleauge }: WorkspaceDMsProps) => {
  return (
    <WorkspaceAccordionSection sectionTitle="다이렉트 메세지">
      {dmList.map((dm, index) => (
        <WorkspaceDirectMessageListItem dm={dm} key={index} />
      ))}
      <Button
        className=" w-full bg-transparent shadow-none hover:bg-gray-50 flex justify-start text-xs  py-0"
        onClick={onAddColleauge}
      >
        {<MdOutlineAddBox className="text-2xl" />}
        <span>직장 동료 추가</span>
      </Button>
    </WorkspaceAccordionSection>
  );
};

export default WorkspaceDMs;

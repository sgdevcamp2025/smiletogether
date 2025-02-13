import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FaHashtag } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { MdOutlineAddBox } from 'react-icons/md';

interface ChannelItem {
  channelId: string;
  name: string;
  isPrivate: boolean;
}

interface WorkspaceSidebarSectionProps {
  sectionTitle: string;
  listItems: ChannelItem[];
}

const WorkspaceDMList = ({
  sectionTitle,
  listItems,
}: WorkspaceSidebarSectionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-4 pb-0 text-white text-xs ">
          {sectionTitle}
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          {listItems?.map((channel, index) => {
            return (
              <Button
                key={index}
                className=" w-full bg-transparent shadow-none hover:bg-gray-50 flex justify-start text-xs  py-0"
              >
                {channel.isPrivate ? <FaHashtag /> : <FiLock />}
                {channel.name}
              </Button>
            );
          })}
          <Button className=" w-full bg-transparent shadow-none hover:bg-gray-50 flex justify-start text-xs  py-0">
            <MdOutlineAddBox />
            <span>직장 동료 추가</span>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WorkspaceDMList;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MdOutlineAddBox } from 'react-icons/md';

interface DMParticipant {
  userId: string;
  username: string;
  profileImage: string;
}

interface LastMessage {
  senderId: string;
  content: string;
  createdAt: string;
}

interface DirectMessage {
  dmId: string;
  participants: DMParticipant[];
  lastMessage: LastMessage;
  unreadCount: number;
}

interface WorkspaceDMListProps {
  sectionTitle: string;
  listItems: DirectMessage[];
}

const WorkspaceDMList = ({ sectionTitle, listItems }: WorkspaceDMListProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-4 pb-0 text-white text-xs ">
          {sectionTitle}
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          {listItems?.map((dm, index) => {
            return <WorkspaceDMItem dm={dm} key={index} />;
          })}
          <Button className=" w-full bg-transparent shadow-none hover:bg-gray-50 flex justify-start text-xs  py-0 pl-5">
            <MdOutlineAddBox className="text-2xl" />
            <span className="pl-3">직장 동료 추가</span>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WorkspaceDMList;

interface WorkspaceDMItemProps {
  dm: DirectMessage;
}

const WorkspaceDMItem = ({ dm }: WorkspaceDMItemProps) => {
  return (
    <Button className="w-full shadow-none flex items-center justify-start text-xs rounded-lg bg-transparent hover:bg-transparent">
      <div className="relative w-6 h-6 flex-shrink-0 mr-2">
        <img
          src={dm.participants[0]?.profileImage}
          className="w-6 h-6 rounded-full"
        />
        {dm.participants.length > 1 ? (
          <span className="absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center text-xs text-white rounded-full">
            {dm.participants.length}
          </span>
        ) : (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 flex items-center justify-center text-xs bg-green-400 text-white rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-start block overflow-hidden whitespace-nowrap text-ellipsis truncate">
          {dm.participants.map(participant => participant.username).join(', ')}
        </span>
      </div>

      {dm.unreadCount > 0 && (
        <div className="w-6 h-6 bg-purple-300 text-white flex items-center justify-center rounded-full ml-2">
          {dm.unreadCount}
        </div>
      )}
    </Button>
  );
};

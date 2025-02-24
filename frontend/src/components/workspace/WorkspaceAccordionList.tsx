import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';

interface WorkspaceAccordionSectionProps {
  sectionTitle: string;
  children: React.ReactNode;
}

const WorkspaceAccordionSection = ({
  sectionTitle,
  children,
}: WorkspaceAccordionSectionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-4 pb-0 text-white text-xs ">
          {sectionTitle}
        </AccordionTrigger>
        <AccordionContent className="pb-0">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WorkspaceAccordionSection;

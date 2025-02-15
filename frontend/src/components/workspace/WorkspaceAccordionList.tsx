import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import { Button } from '@/components/ui/button';

interface WorkspaceAccordionSectionProps {
  sectionTitle: string;
  children: React.ReactNode;
  createButtonIcon?: React.ReactNode;
  createButtonText?: string;
}

const WorkspaceAccordionSection = ({
  sectionTitle,
  children,
  createButtonIcon,
  createButtonText,
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
        <AccordionContent className="pb-0">
          {children}
          <Button className=" w-full bg-transparent shadow-none hover:bg-gray-50 flex justify-start text-xs  py-0">
            {createButtonIcon}
            <span>{createButtonText}</span>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WorkspaceAccordionSection;

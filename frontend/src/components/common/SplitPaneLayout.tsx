import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

interface SplitPaneLayoutProps {
  children1: React.ReactNode;
  children2: React.ReactNode;
}

const SplitPaneLayout = ({ children1, children2 }: SplitPaneLayoutProps) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20}>{children1}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>{children2}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SplitPaneLayout;

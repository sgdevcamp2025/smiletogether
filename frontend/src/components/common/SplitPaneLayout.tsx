import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

interface SplitPaneLayoutProps {
  leftPannelDefaultSize: number;
  rightPannelDefaultSize: number;
  children1: React.ReactNode;
  children2: React.ReactNode;
}

const SplitPaneLayout = ({
  leftPannelDefaultSize,
  rightPannelDefaultSize,
  children1,
  children2,
}: SplitPaneLayoutProps) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      <ResizablePanel defaultSize={leftPannelDefaultSize}>
        {children1}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={rightPannelDefaultSize}>
        {children2}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SplitPaneLayout;

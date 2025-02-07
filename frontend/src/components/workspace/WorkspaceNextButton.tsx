import { Button } from '@/components/ui/button';
import React from 'react';

interface WorkspaceNextButtonProps {
  btnName: string;
  children: React.ReactNode;
}

const WorkspaceNextButton = ({
  btnName,
  children,
}: WorkspaceNextButtonProps) => {
  return <Button>{btnName}</Button>;
};

export default WorkspaceNextButton;

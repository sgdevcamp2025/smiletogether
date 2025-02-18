import React from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="p-6 relative w-full flex items-center justify-center">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalPortal;

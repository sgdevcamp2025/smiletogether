import React from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center opacity-45 z-10 bg-black">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalPortal;

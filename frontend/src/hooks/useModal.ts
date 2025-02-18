import { useState } from 'react';

const useModal = () => {
  const [modals, setModals] = useState<{ [key: string]: boolean }>({});

  const openModal = (key: string) => {
    setModals(prev => {
      return {
        ...prev,
        [key]: true,
      };
    });
  };
  const closeModal = (key: string) => {
    setModals(prev => ({
      ...prev,
      [key]: false,
    }));
  };

  const isOpen = (key: string) => modals[key];

  return { openModal, closeModal, isOpen };
};

export default useModal;

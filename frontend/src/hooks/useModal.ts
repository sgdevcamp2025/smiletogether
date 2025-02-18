import { useState } from 'react';

const useModal = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (key: string) => {
    setActiveModal(key);
  };
  const closeModal = () => {
    setActiveModal(null);
  };

  const isOpen = (key: string) => activeModal === key;

  return { openModal, closeModal, isOpen };
};

export default useModal;

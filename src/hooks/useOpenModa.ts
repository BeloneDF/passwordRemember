import { useState } from 'react';

function useOpenModal() {
  const [open, setOpen] = useState(false);

  function toggleModal() {
    setOpen(prev => !prev);
  }

  return {
    open,
    toggleModal,
  };
}

export default useOpenModal;

import { useState } from "react";

export const useModal = () => {
  const [isShown, setIsShown] = useState(false);
  const toggleModal = () => setIsShown(!isShown);
  return {
    isShown,
    toggleModal,
  };
};

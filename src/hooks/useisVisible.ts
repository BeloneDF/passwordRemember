import { useState } from "react";

export const useIsVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return {
    isVisible,
    toggleVisible,
  };
};

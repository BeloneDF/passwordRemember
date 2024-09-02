import { useState } from "react";

export function useRenderLogin() {
  const [state, setState] = useState(false);

  const handleRender = () => {
    setState(!state);
  };

  return {
    state,
    handleRender,
  };
}

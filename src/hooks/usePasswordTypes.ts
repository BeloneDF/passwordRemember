import { useState } from "react";

export function usePasswordTypes() {
  const [passwordTypes, setPasswordTypes] = useState({
    uppercase: false,
    lowercase: false,
    symbols: false,
    numbers: false,
  });

  return { passwordTypes, setPasswordTypes };
}

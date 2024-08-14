"use client";

import { useState } from "react";

export function usePasswords() {
  const [passwords, setPasswords] = useState([]);

  return {
    passwords,
    setPasswords,
  };
}

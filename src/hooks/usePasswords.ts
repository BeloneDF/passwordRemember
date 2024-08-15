"use client";
import { Passwords } from "@/types/passwords";
import { useState } from "react";

export function usePasswords() {
  const [passwords, setPasswords] = useState<Passwords[]>([]);

  return {
    passwords,
    setPasswords,
  };
}

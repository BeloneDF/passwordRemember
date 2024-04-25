import { useState } from "react";
import { Passwords } from "../types/passwords";

export function useFilter(passwords: Passwords[]) {
  const [search, setSearch] = useState('');

  const filteredPasswords =
    search.length > 0
      ? passwords.filter((pass: Passwords) => pass.name.includes(search))
      : [];

  return {
    setSearch,
    search,
    filteredPasswords
  };
}
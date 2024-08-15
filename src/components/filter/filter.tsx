import { usePasswords } from "@/hooks/usePasswords";
import { useFilter } from "@/hooks/useFilter";
import { User } from "@/types/user";
import { getPasswords } from "@/actions/getPasswords";
import { useEffect, useRef } from "react";
import { Header } from "../header/header";
import { PasswordLists } from "../passwordLists/passwordLists";

export function Filter({ user }: { user: User | null }) {
  const { passwords, setPasswords } = usePasswords();
  const { setSearch, search, filteredPasswords } = useFilter(passwords);
  const hasFetchedPasswords = useRef(false);

  useEffect(() => {
    if (user !== null && !hasFetchedPasswords.current) {
      getPasswords({ user, setPasswords });
      hasFetchedPasswords.current = true; // Evitar múltiplas chamadas
    }
  }, [user, setPasswords]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <PasswordLists
        filteredPasswords={filteredPasswords}
        passwords={passwords}
      />
    </div>
  );
}

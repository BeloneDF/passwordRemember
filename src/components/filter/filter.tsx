import { usePasswords } from "@/hooks/usePasswords";
import { useFilter } from "@/hooks/useFilter";
import { User } from "@/types/user";
import { getPasswords } from "@/actions/getPasswords";
import { useEffect, useRef } from "react";
import { Header } from "../header/header";
import { PasswordLists } from "../passwordLists/passwordLists";
import { useLoading } from "@/hooks/useLoading";

export function Filter({ user }: { user: User | null }) {
  const { passwords, setPasswords } = usePasswords();
  const { setSearch, search, filteredPasswords } = useFilter(passwords);
  const { loading, setLoading } = useLoading();

  const hasFetchedPasswords = useRef(false);

  useEffect(() => {
    if (user !== null && !hasFetchedPasswords.current) {
      setLoading(true);
      getPasswords({ user, setPasswords });
      hasFetchedPasswords.current = true;
      setTimeout(() => {
        setLoading(false);
      }, 600);
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
        loading={loading}
      />
    </div>
  );
}

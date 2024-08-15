import { Passwords } from "@/types/passwords";
import { CardPassword } from "../card/cardPassword/cardPassword";

interface PasswordListsProps {
  filteredPasswords: Passwords[];
  passwords: Passwords[];
}

export function PasswordLists({
  filteredPasswords,
  passwords,
}: PasswordListsProps) {
  return (
    <div className="grid grid-cols-3 w-6/6 h-5/6 mt-8 flex-1 justify-evenly gap-5">
      {filteredPasswords.length > 0
        ? filteredPasswords.map((passwords) => (
            <CardPassword key={passwords.id} password={passwords} />
          ))
        : passwords.length > 0
          ? passwords.map((pass) => (
              <CardPassword key={pass.id} password={pass} />
            ))
          : null}
    </div>
  );
}

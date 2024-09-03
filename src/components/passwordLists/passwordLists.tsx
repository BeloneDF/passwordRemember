import { Passwords } from "@/types/passwords";
import { CardPassword } from "../card/cardPassword/cardPassword";
import { SkeletonPasswordLists } from "./skeletonPasswordLists";

interface PasswordListsProps {
  filteredPasswords: Passwords[];
  passwords: Passwords[];
}

export function PasswordLists({
  filteredPasswords,
  passwords,
}: PasswordListsProps) {
  if (filteredPasswords.length === 0 && passwords.length === 0) {
    return <SkeletonPasswordLists />;
  }
  return (
    <div className="grid grid-cols-3 w-full h-[600px] mt-8 gap-5 overflow-y-auto">
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

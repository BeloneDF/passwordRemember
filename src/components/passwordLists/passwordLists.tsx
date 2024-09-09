import { Passwords } from "@/types/passwords";
import { CardPassword } from "../card/cardPassword/cardPassword";
import { SkeletonPasswordLists } from "./skeletonPasswordLists";

interface PasswordListsProps {
  filteredPasswords: Passwords[];
  passwords: Passwords[];
  loading: boolean;
}

export function PasswordLists({
  filteredPasswords,
  passwords,
  loading,
}: PasswordListsProps) {
  console.log(loading);

  if (loading) {
    return <SkeletonPasswordLists />;
  }

  if (
    filteredPasswords.length <= 0 &&
    passwords.length <= 0 &&
    loading === false
  ) {
    return (
      <div className="flex items-center justify-center w-full h-[600px]">
        <p className="text-lg text-gray-500">No passwords found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-[600px] mt-8 gap-4 overflow-y-auto">
      {filteredPasswords.length >= 1
        ? filteredPasswords.map((passwords) => (
            <CardPassword key={passwords.id} password={passwords} />
          ))
        : passwords.length >= 1
          ? passwords.map((pass) => (
              <CardPassword key={pass.id} password={pass} />
            ))
          : null}
    </div>
  );
}

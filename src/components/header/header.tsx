import { Modal } from "../modal/modal";
import { NewPassword } from "../newPassword/newPassword";
import { PasswordGenerator } from "../passwordGenerator/passwordGenerator";
import { Plus, Bolt } from "lucide-react";

interface HeaderProps {
  setSearch: (value: string) => void;
  search: string;
}

export function Header({ search, setSearch }: HeaderProps) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-zinc-700 border-2 p-2 rounded-md w-full h-12 bg-zinc-200 text-zinc-500 text-lg"
          placeholder="Pesquise sua senha"
        />
      </div>
      <div className="flex gap-2">
        <Modal title="Add new Password" icon={Plus}>
          <NewPassword />
        </Modal>

        <Modal title="Password Generator" icon={Bolt}>
          <PasswordGenerator />
        </Modal>
      </div>
    </header>
  );
}

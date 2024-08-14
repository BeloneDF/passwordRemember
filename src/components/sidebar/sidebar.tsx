import { CircleUser, Edit, Save, LogOut } from "lucide-react";
import { User } from "@/types/user";

export function Sidebar({ user }: { user: User | null }) {
  return (
    <aside className="w-72 bg-zinc-950 p-6 text-white">
      <div className="flex gap-4 p-2 items-center justify-between">
        <span className="font-bold text-lg"> Bem vindo, {user?.username}!</span>
        {user?.photo ? (
          <img
            src={user?.photo}
            alt={user?.username}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <CircleUser size={"64px"} />
        )}
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="gap-2 flex flex-col">
          <span className="font-normal">Nome</span>
          <input
            type="text"
            placeholder="Username"
            value={user ? user.username : ""}
            className="w-full bg-zinc-900 p-2 rounded-md mb-2"
            disabled
          />
        </div>
        <div className="gap-2 flex flex-col">
          <span className="font-normal">Email</span>
          <input
            type="email"
            placeholder="Email"
            value={user ? user.email : ""}
            className="w-full bg-zinc-900 p-2 rounded-md mb-2"
            disabled
          />
        </div>
        <div className="gap-2 flex flex-col">
          <span className="font-normal">Password</span>
          <input
            type="password"
            placeholder="*********"
            className="w-full bg-zinc-900 p-2 rounded-md mb-2"
            disabled
          />
        </div>
        <div className="flex gap-2 flex-row">
          <button className="bg-zinc-700 text-white p-2 rounded-md w-1/3 items-center flex justify-center hover:bg-zinc-600 transition-all">
            <Edit size={24} />
          </button>

          <button className="bg-green-700 text-white p-2 rounded-md w-2/3 items-center flex justify-center hover:bg-green-600 hover:text-white transition-all">
            <Save />
          </button>
        </div>
      </div>
      <footer className="mt-4 text-center text-xs flex flex-col-reverse gap-4 h-3/6 ">
        <span className="text-zinc-500">
          © 2024 - Todos os direitos reservados
        </span>
        <button className="bg-zinc-900 text-white p-2 rounded-md items-center flex justify-center hover:bg-zinc-800 transition-all">
          <LogOut size={24} /> Sair
        </button>
      </footer>
    </aside>
  );
}

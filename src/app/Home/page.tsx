"use client";

import "../../app/globals.css";
import { Plus } from "lucide-react";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Filter } from "@/components/filter/filter";
import { use, useContext } from "react";
import { UserContext } from "@/hooks/userContext";

export default function Home() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex flex-1 ">
        <Sidebar user={user} />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="border-zinc-700 border-2 p-2 rounded-md w-full"
              placeholder="Pesquise sua senha"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-600 transition-all">
              <Plus size={24} />
              <span>Adicionar nova senha</span>
            </button>
          </div>
          <Filter />
        </main>
      </div>
    </div>
  );
}

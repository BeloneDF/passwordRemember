"use client";
import "../../app/globals.css";
import { Plus } from "lucide-react";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Filter } from "@/components/filter/filter";
import { use, useContext } from "react";
import { UserContext } from "@/hooks/userContext";
import { Modal } from "@/components/modal/modal";

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
          <Filter user={user} />
        </main>
      </div>
    </div>
  );
}

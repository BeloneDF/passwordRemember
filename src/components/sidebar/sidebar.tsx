import { useState, useRef } from "react";
import { Edit, Save, LogOut, Check, X } from "lucide-react";
import { User } from "@/types/user";
import { logOut } from "@/actions/logOut";
import { useEditProfile } from "@/hooks/useEditProfile";
import { useChangeUser } from "@/hooks/useChangeUser";
import { selectMethod } from "@/api/methods";
import { Data } from "@/api/methods";
import { SidebarSkeleton } from "./skeleton";
import { useIsVisible } from "@/hooks/useisVisible";
import { Toast } from "../toast";

export function Sidebar({ user }: { user: User | null }) {
  const { edit, handleEdit } = useEditProfile();
  const { changedUser, handleChangeUser } = useChangeUser();
  const { isVisible, toggleVisible } = useIsVisible();
  const [image, setImage] = useState(user?.photo);
  const [error, setError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        handleChangeUser(reader.result as string, "photo");
      };
      reader.readAsDataURL(file);
    }
  };

  async function saveChanges() {
    try {
      const userData: Partial<Data> = {};

      if (changedUser?.username && changedUser.username.trim()) {
        userData.username = changedUser.username.trim();
      }

      if (changedUser?.email && changedUser.email.trim()) {
        userData.email = changedUser.email.trim();
      }

      if (changedUser?.password && changedUser.password.trim()) {
        userData.password = changedUser.password.trim();
      }

      if (changedUser?.photo || image) {
        userData.photo = changedUser.photo || image || "";
      }

      if (Object.keys(userData).length === 0) {
        toggleVisible();
        setError(true);
        return;
      }

      const response = await selectMethod("put", `users/${user?.id}`, userData);

      if (response) {
        toggleVisible();
        setTimeout(() => {
          toggleVisible();
        }, 3000);
      }
    } catch (error) {
      setError(true);
      console.error("Error saving changes:", error);
    }
  }

  if (!user) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="w-72 bg-zinc-950 p-6 text-white">
      <div className="flex gap-4 p-2 items-center justify-between">
        <span className="font-bold text-lg">Welcome, {user?.username}!</span>
        <div
          className={`w-20 rounded-full bg-zinc-900 cursor-pointer ${!edit ? "border" : ""}`}
          onClick={() => fileInputRef.current?.click()}
        >
          {user?.photo ? (
            <img
              className={`w-20 object-cover rounded-full ${!edit ? "border" : ""}`}
              src={user?.photo}
              alt={user?.username}
            />
          ) : (
            <span className="text-white text-3xl">
              {user?.username?.split(" ")[0][0].toUpperCase()}
            </span>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="gap-2 flex flex-col">
          <span className="font-normal">Name</span>
          <input
            type="text"
            placeholder="Username"
            value={!edit ? changedUser.username : user?.username}
            className="w-full bg-zinc-900 p-2 rounded-md mb-2"
            disabled={edit}
            onChange={(e) => handleChangeUser(e.target.value, "username")}
          />
        </div>
        <div className="gap-2 flex flex-col">
          <span className="font-normal">Email</span>
          <input
            type="email"
            placeholder="Email"
            value={!edit ? changedUser.email : user?.email}
            onChange={(e) => handleChangeUser(e.target.value, "email")}
            className="w-full bg-zinc-900 p-2 rounded-md mb-2"
            disabled={edit}
          />
        </div>
        <div className="gap-2 flex flex-col">
          <span className="font-normal">Password</span>
          <input
            type="password"
            placeholder="*********"
            value={!edit ? changedUser.password : user?.password}
            onChange={(e) => handleChangeUser(e.target.value, "password")}
            className="w-full bg-zinc-900 p-2 rounded-md mb-2"
            disabled={edit}
          />
        </div>
        <div className="flex gap-2 flex-row">
          <button
            onClick={handleEdit}
            className="bg-zinc-900 text-white p-2 rounded-md w-1/3 items-center flex justify-center hover:bg-zinc-800 transition-all"
          >
            <Edit size={24} />
          </button>

          <button
            onClick={saveChanges}
            className="bg-emerald-800 text-white p-2 rounded-md w-2/3 items-center flex justify-center hover:bg-emerald-700 hover:text-white transition-all"
          >
            <Save />
          </button>
        </div>
      </div>
      <footer className="mt-4 text-center text-xs flex flex-col-reverse gap-4 h-3/6 ">
        <span className="text-zinc-500">
          © 2024 - All rights reserved - Privacy Policy
        </span>
        <button
          onClick={logOut}
          className="bg-zinc-900 text-white p-2 rounded-md items-center flex justify-center gap-2 hover:bg-zinc-800 transition-all"
        >
          <LogOut size={24} />
          Log Out
        </button>
      </footer>
      {isVisible && error === false ? (
        <div className="fixed bottom-4 right-4 z-[999]">
          <Toast.Root isVisible={isVisible}>
            <Toast.Icon icon={Check} className="text-emerald-400" />
            <Toast.Content
              text="Perfil updated succefully!"
              subtitle="Password deleted: "
            />
            <Toast.Actions>
              <Toast.Action
                icon={Check}
                className="bg-emerald-500 text-white hover:bg-emerald-600"
                onClick={toggleVisible}
              />
            </Toast.Actions>
          </Toast.Root>
        </div>
      ) : null}
      {isVisible && error === true ? (
        <div className="fixed bottom-4 right-4 z-[999]">
          <Toast.Root isVisible={isVisible}>
            <Toast.Icon icon={X} className="text-red-400" />
            <Toast.Content text="Error while updating user!" subtitle="Error" />
            <Toast.Actions>
              <Toast.Action
                icon={Check}
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={toggleVisible}
              />
            </Toast.Actions>
          </Toast.Root>
        </div>
      ) : null}
    </aside>
  );
}

import { Passwords } from "@/types/passwords";
import { ImageOff, Trash, Pencil, Copy } from "lucide-react";
import { deletePassword } from "@/actions/deletePasswords";
import { copyToClipboard } from "@/actions/copyToClipboard";

interface CardPasswordProps {
  password: Passwords;
}

export function CardPassword({ password }: CardPasswordProps) {
  return (
    <div className="flex gap-4 bg-zinc-700 h-32 p-4 rounded-lg text-white hover:bg-white/5 transition-colors">
      <div className="flex justify-center items-center w-1/4">
        {password.image ? (
          <img
            src={password.image}
            alt={password.name}
            className="w-28 h-24 rounded-lg object-contain bg-transparent "
          />
        ) : (
          <ImageOff size={72} />
        )}
      </div>
      <div className="w-3/4 ">
        <h2 className="text-xl font-semibold capitalize">{password.name}</h2>
        <div className="text-md text-gray-500 w-3/4 flex items-center justify-between">
          <p className="truncate  w-3/4 ">Login: {password.login}</p>
          <Copy
            size={16}
            className="hover:text-white hover:cursor-pointer"
            onClick={() => copyToClipboard({ password, type: "login" })}
          />
        </div>
        <div className="text-md text-gray-500 w-3/4 flex items-center justify-between">
          <p className="truncate  w-3/4 ">Password: **********</p>
          <Copy
            size={16}
            className="hover:text-white hover:cursor-pointer"
            onClick={() => copyToClipboard({ password, type: "password" })}
          />
        </div>
        <div className="flex gap-4 items-center">
          <span className="mr-2 text-gray-500">2FA</span>
          <div
            className={`h-4 w-4 rounded-full ${
              password.second_verification ? "bg-green-600" : "bg-red-500"
            }`}
          />
          <button
            onClick={() => password && deletePassword({ password })}
            className="text-sm text-red-500 h-6 w-6 items-center flex justify-center rounded-full hover:drop-shadow-xl"
          >
            <Trash size={16} className="" />
          </button>
          <button className="text-sm text-blue-500 h-6 w-6 items-center flex justify-center rounded-full hover:bg-blue-800">
            <Pencil size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

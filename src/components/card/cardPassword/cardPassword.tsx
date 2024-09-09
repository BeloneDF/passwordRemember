import { Passwords } from "@/types/passwords";
import { ImageOff, Trash, Pencil, Copy, Check } from "lucide-react";
import { deletePassword } from "@/actions/deletePasswords";
import { copyToClipboard } from "@/actions/copyToClipboard";
import { Toast } from "@/components/toast";
import { useIsVisible } from "@/hooks/useisVisible";

interface CardPasswordProps {
  password: Passwords;
}

export function CardPassword({ password }: CardPasswordProps) {
  const { isVisible, toggleVisible } = useIsVisible();
  return (
    <div className="flex gap-4 bg-zinc-800 h-32 p-4 rounded-lg text-white hover:bg-white/5 transition-colors">
      <div className="flex justify-center items-center w-1/4">
        {password.image ? (
          <img
            src={password.image}
            alt={password.name}
            className="w-24 h-24 rounded-lg object-contain bg-transparent "
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
          <img
            className="h-5 w-5 rounded-full"
            src={password.image_verification_software}
            alt=""
          />
          <button
            onClick={() => {
              if (password) {
                deletePassword({ password });
                toggleVisible();
              }
            }}
            className="text-sm text-red-00 h-6 w-6 items-center flex justify-center rounded-lg hover:bg-red-700 hover:text-white"
          >
            {isVisible && (
              <div className="fixed bottom-4 right-4 z-[999]">
                <Toast.Root isVisible={isVisible}>
                  <Toast.Icon icon={Trash} className="text-red-400" />
                  <Toast.Content
                    text="Succefull passwrod Deleted!"
                    subtitle="Password deleted: "
                    span={`${password.name}`}
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
            )}
            <Trash size={16} />
          </button>
          <button className="text-sm text-blue-500 h-6 w-6 items-center flex justify-center rounded-lg hover:bg-blue-700 hover:text-white">
            <Pencil size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

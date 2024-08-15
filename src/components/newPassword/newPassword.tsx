import { Image, Plus } from "lucide-react";
import InputText from "../inputText/inputText";

export function NewPassword() {
  return (
    <form className="p-4 md:p-5">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <InputText
            label="Your password service"
            placeholder="Enter password service"
            type="text"
            name="name"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 col-span-2  items-center">
          <div>
            <InputText
              label="Password service Photo"
              placeholder="Enter password service"
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png"
            />
          </div>
          <div className=" justify-center flex mt-7">
            <Image size={32} />
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <InputText
            label="Password"
            placeholder="Enter password"
            type="password"
            name="password"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <InputText
            label="Login"
            placeholder="Enter Login"
            type="text"
            name="login"
          />
        </div>
        <div className="col-span-2">
          <InputText
            label="Password"
            placeholder="Enter password"
            type="password"
            name="password"
          />
        </div>
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-600 transition-all"
      >
        <Plus size={24} />
        Adicionar nova senha
      </button>
    </form>
  );
}

"use client";
import { Image, Plus } from "lucide-react";
import InputText from "../inputText/inputText";
import { addPassword } from "@/actions/addPassword";
import { useContext } from "react";
import { UserContext } from "@/hooks/userContext";
import { useForm } from "react-hook-form";

//validação form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordsSchema } from "@/types/passwords";

type CreatePasswordSchema = z.infer<typeof passwordsSchema>;

export function NewPassword() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;

  const { register, handleSubmit } = useForm<CreatePasswordSchema>({
    resolver: zodResolver(passwordsSchema),
  });

  async function createPassword({
    name,
    image,
    password,
    login,
    second_verification,
    verificarion_software,
    image_verification_software,
  }: CreatePasswordSchema) {
    try {
      await addPassword({
        name,
        image,
        password,
        login,
        second_verification,
        verificarion_software,
        image_verification_software,
        userId: user?.id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="p-4 md:p-5" onSubmit={handleSubmit(createPassword)}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <InputText
            label="Your password service"
            placeholder="Enter password service"
            type="text"
            register={register}
            name="name"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 col-span-2 items-center">
          <div>
            <InputText
              label="Password service Photo"
              placeholder="Enter password service"
              type="file"
              register={register}
              name="image"
              accept=".jpg, .jpeg, .png"
            />
          </div>
          <div className="justify-center flex mt-7">
            <Image size={32} />
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <InputText
            label="Password"
            placeholder="Enter password"
            type="password"
            register={register}
            name="password"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <InputText
            label="Login"
            placeholder="Enter Login"
            type="text"
            register={register}
            name="login"
          />
        </div>
        <div className="col-span-1">
          <InputText
            label="Have 2FA?"
            placeholder="Enter password"
            type="checkbox"
            register={register}
            name="second_verification"
          />
        </div>
        <div className="col-span-2">
          <InputText
            label="Software 2FA"
            placeholder="Software 2FA name"
            type="text"
            register={register}
            name="verificarion_software"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 col-span-2 items-center">
          <div>
            <InputText
              label="2FA Software Photo"
              placeholder="Enter Software 2FA"
              type="file"
              accept=".jpg, .jpeg, .png"
              name="image_verification_software"
              register={register}
            />
          </div>
          <div className="justify-center flex mt-7">
            <Image size={32} />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-600 transition-all"
      >
        <Plus size={24} />
        Add new password
      </button>
    </form>
  );
}

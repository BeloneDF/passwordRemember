"use client";
import { Image, Plus } from "lucide-react";
import InputText from "../inputText/inputText";
import { addPassword } from "@/actions/addPassword";
import { useContext } from "react";
import { UserContext } from "@/hooks/userContext";
import { useForm } from "react-hook-form";

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
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password service
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter password service"
              type="text"
              {...register("name")}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 col-span-2 items-center">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password service image
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter password service"
              type="file"
              {...register("image")}
              accept=".jpg, .jpeg, .png"
            />
          </div>
          <div className="justify-center flex mt-7">
            <Image size={32} />
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter password"
              type="password"
              {...register("password")}
            />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Login
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter Login"
              type="text"
              {...register("login")}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Have 2FA?
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter password"
              type="checkbox"
              {...register("second_verification")}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Software 2FA name
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Software 2FA name"
              type="text"
              {...register("verificarion_software")}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 col-span-2 items-center">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Software 2FA image
            </label>
            <input
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter Software 2FA"
              type="file"
              accept=".jpg, .jpeg, .png"
              {...register("image_verification_software")}
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

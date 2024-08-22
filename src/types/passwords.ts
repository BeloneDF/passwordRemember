import { z } from "zod";

export type AddPasswords = {
  id?: string;
  password: string;
  name: string;
  image?: FileList | string;
  login: string;
  second_verification: boolean;
  verificarion_software?: string | "none";
  image_verification_software?: FileList;
  userId: string | undefined;
};

export type Passwords = {
  id: string;
  password: string;
  name: string;
  image: string;
  login: string;
  second_verification: boolean;
  verificarion_software: string;
  image_verification_software: string;
  userId: string;
};

export const passwordsSchema = z.object({
  id: z.string().optional(),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" }),
  name: z.string(),
  image: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "Invalid file type.",
    })
    .optional(),
  second_verification: z.boolean(),
  verificarion_software: z.string().optional(),
  image_verification_software: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "Invalid file type.",
    })
    .optional(),
  userId: z.string().optional(),
  login: z.string(),
});

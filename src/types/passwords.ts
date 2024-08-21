import { z } from "zod";

export type Passwords = {
  id?: string;
  password: string;
  name: string;
  image?: string | "";
  login: string;
  second_verification: boolean;
  verificarion_software?: string | "";
  image_verification_software?: string;
  userId: string | undefined;
};

export const passwordsSchema = z.object({
  id: z.string().optional(),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" }),
  name: z.string(),
  image: z.any().optional(),
  second_verification: z.boolean(),
  verificarion_software: z.string().optional(),
  image_verification_software: z.any().optional(),
  userId: z.string(),
  login: z.string(),
});

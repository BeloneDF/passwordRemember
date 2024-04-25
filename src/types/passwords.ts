import { z } from "zod";

export interface Passwords {
  id: string;
  password: string;
  name: string;
  image: string;
  second_verification: boolean;
  verificarion_software: string;
  image_verification_software: string;
  userId: string;
}

export const passwordsSchema = z.object({
  id: z.string(),
  password: z.string(),
  name: z.string(),
  image: z.string(),
  second_verification: z.boolean(),
  verificarion_software: z.string(),
  image_verification_software: z.string(),
  userId: z.string(),
});

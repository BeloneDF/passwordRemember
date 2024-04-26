import z from "zod";

export interface Password {
  password: string;
  name: string;
  image: string;
  second_verification: boolean;
  verificarion_software: string;
  image_verification_software: string;
  userId: string;
  login: string;
}

export const PasswordSchema = z.object({
  data: z.object({
    password: z.string(),
    name: z.string(),
    image: z.string(),
    second_verification: z.boolean().optional(),
    verificarion_software: z.string().optional(),
    image_verification_software: z.string().optional(),
    userId: z.string().uuid(),
  }),
});

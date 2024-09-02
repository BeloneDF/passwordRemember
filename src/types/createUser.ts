import { z } from "zod";

export type createUserPropsA = {
  email: string;
  password: string;
  username?: string;
  photo?: string;
};

export const createUserProps = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().optional(),
  photo: z.string().optional(),
});

export type CreateUserSchema = z.infer<typeof createUserProps>;

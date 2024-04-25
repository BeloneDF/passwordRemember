import { z } from "zod";

export interface User {
  username: string;
  password: string;
  email: string;
}

export const UserSchema = z.object({
  data: z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email().optional(),
  }),
});

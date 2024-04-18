import { z } from "zod";

const envSchema = z.object({
  HOST: z.string(),
  PORT: z.string(),
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

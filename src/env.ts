import { z } from "zod";

const envSchema = z.object({
  HOST: z.string(),
  PORT: z.string(),
  DATABASE_URL: z.string().url(),
  JWT_SECRETS: z.string(),
  JWT_SECRETS_PASSWORD: z.string(),
  EMAIL_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);

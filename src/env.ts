import { z } from "zod";

const envSchema = z.object({
  HOST: z.string(),
  PORT: z.string(),
  DATABASE_URL: z.string().url(),
  JWT_SECRETS: z.string(),
  JWT_SECRETS_PASSWORD: z.string(),
  MAILERSEND_API_KEY: z.string(),
  MILERSEND_SENDER: z.string(),
  MILERSEND_TEMPLATE_ID: z.string(),
});

export const env = envSchema.parse(process.env);

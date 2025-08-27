import { z } from "zod";

const envSchema = z.object({
  DASHBOARD_ID: z.coerce.number().int(),
  PHONE_NUMBER: z.string().length(11),
  API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);

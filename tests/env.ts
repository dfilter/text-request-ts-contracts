import { z } from "zod";

const envSchema = z.object({
  DASHBOARD_ID: z.coerce.number().int(),
  DASHBOARD_PN: z.string().length(11),
  PHONE_NUMBER: z.string().length(11),
  API_TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);

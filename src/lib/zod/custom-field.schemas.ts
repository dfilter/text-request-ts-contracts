import { z } from "zod";

export const customFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const contactCustomFieldSchema = z.object({
  id: z.string(),
  value: z.string().nullish(),
});

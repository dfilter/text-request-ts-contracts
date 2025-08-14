import { z } from "zod";

export const customFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type CustomField = z.infer<typeof customFieldSchema>;

export const contactCustomFieldSchema = z.object({
  id: z.string(),
  value: z.string().nullish(),
});
export type ContactCustomField = z.infer<typeof contactCustomFieldSchema>;

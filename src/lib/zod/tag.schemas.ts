import { z } from "zod";
import { collectionMetaSchema } from "./common.schemas";

export const tagSchema = z.object({
  id: z.string(),
  tag_color: z.string(),
  tag: z.string(),
});
export type Tag = z.infer<typeof tagSchema>;

export const tagCollectionSchema = z.object({
  items: z.array(tagSchema),
  meta: collectionMetaSchema,
});
export type TagCollection = z.infer<typeof tagCollectionSchema>;

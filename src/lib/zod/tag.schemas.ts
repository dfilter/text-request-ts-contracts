import { z } from "zod";
import { collectionMetaSchema } from "./common.schemas.js";

export const tagSchema = z.object({
  id: z.string(),
  tag_color: z.string(),
  tag: z.string(),
});

export const tagCollectionSchema = z.object({
  items: z.array(tagSchema),
  meta: collectionMetaSchema,
});

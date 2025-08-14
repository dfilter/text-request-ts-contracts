import { z } from "zod";
import { collectionMetaSchema, dashboardIdPathParamsSchema } from "./common.schemas.js";

export const groupSchema = z.object({
  id: z.number(),
  group_member_count: z.number(),
  is_keyword: z.boolean(),
  name: z.string(),
  notes: z.string().nullish(),
  last_message_sent_utc: z.coerce.date().nullish(),
});

export const createGroupSchema = z.object({
  name: z.string(),
  notes: z.string().nullish(),
});

export const groupCollectionSchema = z.object({
  items: z.array(groupSchema),
  meta: collectionMetaSchema,
})

export const groupParamSchema = dashboardIdPathParamsSchema.extend({ groupId: z.number() })

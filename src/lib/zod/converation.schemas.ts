import { z } from "zod";
import { messageSchema } from "./message.schemas.js";
import { collectionMetaSchema, paginationQuerySchema, preprocessArrayToCommaSepratedString } from "./common.schemas.js";

export const converasation = z.object({
  phone_number: z.string(),
  last_message: messageSchema
});

export const conversationCollection = z.object({
  items: z.array(converasation),
  meta: collectionMetaSchema,
});

export const conversationQuerySchema = paginationQuerySchema.extend({
  include_archived: z.boolean(),
  search: z.string(),
  show_unresolved_only: z.boolean(),
  tags: preprocessArrayToCommaSepratedString(z.string().uuid()),
}).partial()

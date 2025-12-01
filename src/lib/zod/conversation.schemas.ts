import { z } from "zod";
import { messageSchema } from "./message.schemas";
import {
  collectionMetaSchema,
  paginationQuerySchema,
  preprocessArrayToCommaSeparatedString,
} from "./common.schemas";

export const conversation = z.object({
  phone_number: z.string(),
  last_message: messageSchema,
});
export type Conversation = z.infer<typeof conversation>;

export const conversationCollection = z.object({
  items: z.array(conversation),
  meta: collectionMetaSchema,
});
export type ConversationCollection = z.infer<typeof conversationCollection>;

export const conversationQuerySchema = paginationQuerySchema
  .extend({
    include_archived: z.boolean(),
    search: z.string(),
    show_unresolved_only: z.boolean(),
    tags: preprocessArrayToCommaSeparatedString(z.string().uuid()),
  })
  .partial();
export type ConversationQuery = z.infer<typeof conversationQuerySchema>;

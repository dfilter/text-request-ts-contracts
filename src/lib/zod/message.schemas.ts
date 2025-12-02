import { z } from "zod";
import {
  collectionMetaSchema,
  paginationQuerySchema,
  preprocessUuid,
} from "./common.schemas";

export const messageStatusEnum = z.enum([
  "accepted",
  "queued",
  "sending",
  "delivered",
  "error",
  "sent",
  "failed",
  "undelivered",
  "delivered",
  "unclaimed",
]);
export type MessageStatus = z.infer<typeof messageStatusEnum>;

export const messageDirection = z.enum(["R", "S"]);
export type MessageDirection = z.infer<typeof messageDirection>;

export const messageSchema = z.object({
  message_id: preprocessUuid(z.string()),
  body: z.string(),
  message_direction: messageDirection,
  response_by_username: z.string().nullable(),
  message_timestamp_utc: z.coerce.date(),
  delivery_status: messageStatusEnum.nullable(),
  delivery_error: z.string().nullable(),
  mms_media: z.string().array(),
});
export type Message = z.infer<typeof messageSchema>;

export const mmsResponseSchema = z.object({
  mime_type: z.string(),
  url: z.string(),
});
export type MMSResponse = z.infer<typeof mmsResponseSchema>;

export const mmsErrorMessageSchema = z.object({
  message: z.string(),
});
export type MMSErrorMessage = z.infer<typeof mmsErrorMessageSchema>;

export const messageCreateSchema = z.object({
  from: z.string().min(10),
  to: z.string().min(10),
  body: z.string().nonempty(),
  sender_name: z.string().nonempty(),
  status_callback: z.string().url().optional(),
  location_callback: z.string().url().optional(),
  mms_media: z.array(z.string().url()).optional(),
  authvia_conversation_id: z.string().optional(),
  geolocation_requested: z.boolean().optional(),
});
export type MessageCreate = z.infer<typeof messageCreateSchema>;

export const messageCreateResponseSchema = z.object({
  message_id: z.string(),
  segments_count: z.number(),
  from: z.string(),
  to: z.string(),
  status: messageStatusEnum,
});
export type MessageCreateResponse = z.infer<typeof messageCreateResponseSchema>;

export const messageCollectionSchema = z.object({
  items: z.array(messageSchema),
  meta: collectionMetaSchema,
});
export type MessageCollection = z.infer<typeof messageCollectionSchema>;

export const contactMessageCreateSchema = z.object({
  body: z.string(),
  sender_name: z.string(),
  status_callback: z.string().url().optional(),
  location_callback: z.string().url().optional(),
  mms_media: z.string().url().array().optional(),
});
export type ContactMessageCreate = z.infer<typeof contactMessageCreateSchema>;

export const messageQuerySchema = paginationQuerySchema
  .extend({
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
  })
  .optional();
export type MessageQuery = z.infer<typeof messageQuerySchema>;

export const messageIdParamSchema = z.object({ message_id: z.string() });
export type MessageIdParam = z.infer<typeof messageIdParamSchema>;

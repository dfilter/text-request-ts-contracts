import { z } from "zod";
import {
  collectionMetaSchema,
  dashboardIdPathParamsSchema,
} from "./common.schemas";
import { messageDirection, messageStatusEnum } from "./message.schemas";

export const eventTypeSchema = z.array(z.string());
export type EventType = z.infer<typeof eventTypeSchema>;

export const httpVerb = z.enum(["PUT", "DELETE", "DELETE"]);
export type HTTPVerb = z.infer<typeof httpVerb>;

export const event = z.enum([
  "msg_sent",
  "msg_received",
  "contact_created",
  "msg_status_updated",
  "location_received",
  "payment_status_updated",
  "contact_updated",
]);
export type Event = z.infer<typeof event>;

export const webhookSchema = z.object({
  id: z.number(),
  target_url: z.string(),
  event,
  dashboard_id: z.number(),
  httpVerb,
  is_user_defined: z.boolean(),
  is_connected: z.boolean(),
});
export type Webhook = z.infer<typeof webhookSchema>;

export const webhookCollectionSchema = z.object({
  items: z.array(webhookSchema),
  meta: collectionMetaSchema,
});
export type WebhookCollection = z.infer<typeof webhookCollectionSchema>;

export const webhookCreateSchema = z.object({
  target_url: z.string().url(),
  event,
  http_verb: httpVerb,
});
export type WebhookCreate = z.infer<typeof webhookCreateSchema>;

export const webhookPathParams = dashboardIdPathParamsSchema.extend({
  webhook_id: z.number().int().gt(0),
});
export type WebhookPathParams = z.infer<typeof webhookPathParams>;

export const msg_received_schema = z.object({
  messageUniqueIdentifier: z.string().uuid(),
  account: z.object({
    id: z.number().int(),
    externalAccountId: z.string().nullable().optional(),
  }),
  yourPhoneNumber: z.object({
    id: z.number().int(),
    externalPhoneId: z.string().nullable().optional(),
    description: z.string(),
    phoneNumber: z.string(),
  }),
  conversation: z.object({
    id: z.number().int(),
    date: z.coerce.date(),
    status: messageStatusEnum.nullable(),
    consumerPhoneNumber: z.string(),
    messageDirection,
    message: z.string(),
    numSegments: z.number().int(),
    consumerFriendlyName: z.string().nullable(),
    mmsAttachments: z
      .object({
        mimeType: z.string(),
        url: z.string(),
      })
      .array(),
  }),
});
export type MessageReceived = z.infer<typeof msg_received_schema>;

export const contact_created_schema = z.object({
  ContactId: z.number(),
  LocationPhoneNumber: z.string(),
  ContactPhoneNumber: z.string(),
  ContactFriendlyName: z.string().nullable(),
});
export type ContactCreated = z.infer<typeof contact_created_schema>;

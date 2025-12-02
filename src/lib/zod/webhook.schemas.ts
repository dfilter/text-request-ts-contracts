import { z } from "zod";
import {
  collectionMetaSchema,
  dashboardIdPathParamsSchema,
} from "./common.schemas";

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

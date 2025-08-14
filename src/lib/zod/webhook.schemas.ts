import { z } from "zod";
import {
  collectionMetaSchema,
  dashboardIdPathParamsSchema,
} from "./common.schemas.js";

export const eventTypeSchema = z.array(z.string());

export const httpVerb = z.enum(["PUT", "DELETE", "DELETE"]);

export const event = z.enum([
  "msg_sent",
  "msg_received",
  "contact_created",
  "msg_status_updated",
  "location_received",
  "payment_status_updated",
  "contact_updated",
]);

export const webhookSchema = z.object({
  id: z.number(),
  target_url: z.string(),
  event,
  dashboard_id: z.number(),
  httpVerb,
  is_user_defined: z.boolean(),
  is_connected: z.boolean(),
});

export const webookCollectionSchema = z.object({
  items: z.array(webhookSchema),
  meta: collectionMetaSchema,
});

export const webhookCreateSchema = z.object({
  target_url: z.string().url(),
  event,
  http_verb: httpVerb,
});

export const webhookPathParams = dashboardIdPathParamsSchema.extend({
  webhook_id: z.number().int().gt(0),
});

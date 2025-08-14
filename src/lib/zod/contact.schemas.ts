import { z } from "zod"

import { messageSchema } from "./message.schemas.js";
import { collectionMetaSchema, preprocessArrayToCommaSepratedString } from "./common.schemas.js";
import { contactCustomFieldSchema } from "./custom-field.schemas.js";

export const contactQueryParamsSchema = z.object({
  page: z.number().int().gte(0).optional(),
  page_size: z.number().int().gt(0).optional(),
  contact_created_after: z.date().optional(),
  contact_created_before: z.date().optional(),
  contact_phone_number: z.string().optional(),
  groups: preprocessArrayToCommaSepratedString(z.number().int().gt(0)).optional(),
  has_message_history: z.boolean().optional(),
  has_opted_out: z.boolean().optional(),
  is_archived: z.boolean().optional(),
  is_blocked: z.boolean().optional(),
  is_resolved: z.boolean().optional(),
  is_suppressed: z.boolean().optional(),
  last_message_received_after: z.date().optional(),
  last_message_received_before: z.date().optional(),
  last_message_sent_after: z.date().optional(),
  last_message_sent_before: z.date().optional(),
  last_message_timestamp_after_utc: z.date().optional(),
  last_message_timestamp_before_utc: z.date().optional(),
  tags: preprocessArrayToCommaSepratedString(z.string().uuid()),
});

export const contactSchema = z.object({
  phone_number: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  display_name: z.string().nullable(),
  thread_id: z.string(),
  is_suppressed: z.boolean(),
  is_archived: z.boolean(),
  is_blocked: z.boolean(),
  suppressed_reason: z.string().nullable(),
  note: z.string().nullable(),
  groups: z.number().array(),
  contact_tags: z.string().array(),
  custom_fields: contactCustomFieldSchema.array(),
  is_resolved: z.boolean(),
});

export const fullContactSchema = contactSchema.extend({
  first_contact_utc: z.coerce.date().nullable(),
  opted_out_utc: z.coerce.date().nullable(),
  last_msg_sent_utc: z.coerce.date().nullable(),
  last_msg_received_utc: z.coerce.date().nullable(),
  total_msgs_sent: z.number(),
  total_msgs_received: z.number(),
  response_count: z.number(),
  date_created_utc: z.coerce.date().nullable(),
  last_contact_date_utc: z.coerce.date().nullable(),
  last_message: messageSchema.nullable(),
});

export const contactsCollectionSchema = z.object({
  items: z.array(fullContactSchema),
  meta: collectionMetaSchema,
});

export const contactUpdateFields = z.object({
  groups: z.array(z.number()),
  add_group_to_contact: z.boolean(),
  contact_tags: z.array(z.string()),
  add_tag_to_contact: z.boolean(),
  custom_field_id: z.string(),
  custom_field_value: z.string(),
});

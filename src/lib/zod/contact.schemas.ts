import { z } from "zod";

import { messageSchema } from "./message.schemas";
import {
  collectionMetaSchema,
  preprocessArrayToCommaSeparatedString,
} from "./common.schemas";
import { contactCustomFieldSchema } from "./custom-field.schemas";

export const contactQueryParamsSchema = z
  .object({
    page: z.number().int().gte(0),
    page_size: z.number().int().gt(0),
    contact_created_after: z.date(),
    contact_created_before: z.date(),
    contact_phone_number: z.string(),
    groups: preprocessArrayToCommaSeparatedString(z.number().int().gt(0)),
    has_message_history: z.boolean(),
    has_opted_out: z.boolean(),
    is_archived: z.boolean(),
    is_blocked: z.boolean(),
    is_resolved: z.boolean(),
    is_suppressed: z.boolean(),
    last_message_received_after: z.date(),
    last_message_received_before: z.date(),
    last_message_sent_after: z.date(),
    last_message_sent_before: z.date(),
    last_message_timestamp_after_utc: z.date(),
    last_message_timestamp_before_utc: z.date(),
    tags: preprocessArrayToCommaSeparatedString(z.string().uuid()),
  })
  .partial();
export type ContactQuery = z.infer<typeof contactQueryParamsSchema>;

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
export type Contact = z.infer<typeof contactSchema>;

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
export type FullContact = z.infer<typeof fullContactSchema>;

export const contactsCollectionSchema = z.object({
  items: z.array(fullContactSchema),
  meta: collectionMetaSchema,
});
export type ContactCollection = z.infer<typeof contactsCollectionSchema>;

export const contactUpdateFields = z.object({
  groups: z.array(z.number()),
  add_group_to_contact: z.boolean(),
  contact_tags: z.array(z.string()),
  add_tag_to_contact: z.boolean(),
  custom_field_id: z.string(),
  custom_field_value: z.string(),
});
export type ContactUpdate = z.infer<typeof contactUpdateFields>;

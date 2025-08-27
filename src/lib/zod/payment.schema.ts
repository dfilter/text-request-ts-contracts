import { z } from "zod";
import {
  collectionMetaSchema,
  dashboardIdPathParamsSchema,
  paginationQuerySchema,
} from "./common.schemas";

export const sortTypeSchema = z.enum(["amount", "contact", "date", "status"]);
export const sortDirection = z.enum(["asc", "desc"]);
export const transactionStatus = z.enum([
  "Unknown",
  "Approved",
  "Declined",
  "NotAuthorized",
  "Error",
  "Processing",
  "Failed",
  "Authorized",
  "PaymentInProgress",
]);
export const textrequestPaymentStatus = z.enum([
  "Unknown",
  "Sent",
  "Paid",
  "Cancelled",
  "Failed",
  "PastDue",
  "MarkedAsPaid",
]);

export const paymentQuerySchema = paginationQuerySchema
  .extend({
    reference_number: z.string(),
    phone_number: z.string().min(10),
    sort_type: sortTypeSchema,
    sort_direction: sortDirection,
  })
  .partial();

export const paymentSchema = z.object({
  payment_id: z.number(),
  request_date: z.coerce.date(),
  recipient: z.string(),
  description: z.string(),
  customer_phone: z.string(),
  amount_requested: z.number(),
  is_past_due: z.boolean(),
  reminder_was_sent: z.boolean(),
  transaction_status: transactionStatus,
  textrequest_payment_status: textrequestPaymentStatus,
  reference_number: z.string(),
});

export const paymentCollectionSchema = z.object({
  items: z.array(paymentSchema),
  meta: collectionMetaSchema,
});

export const paymentCreateSchema = z.object({
  message: z.string().nonempty(),
  description: z.string().nonempty(),
  customer_phone: z.string().min(10),
  amount_requested: z.number().gt(0),
  reference_number: z.string().nonempty(),
});

export const paymentPathParamSchema = dashboardIdPathParamsSchema.extend({
  payment_id: z.number().int().gt(0),
});

export const activatePaymentSchema = z.object({ active: z.boolean() });

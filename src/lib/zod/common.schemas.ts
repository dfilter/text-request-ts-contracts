import { v7 as uuidv7 } from "uuid";
import { type ZodSchema, z } from "zod";

export const apiKeySchema = z.string();

export const dashboardIdPathParamsSchema = z.object({
  dashboard_id: z.number(),
});
export type DashboardIdPathParams = z.infer<typeof dashboardIdPathParamsSchema>;

export const dashboardIdFieldIdPathParamsSchema =
  dashboardIdPathParamsSchema.extend({ field_id: z.string() });
export type DashboardFieldIdPathParams = z.infer<
  typeof dashboardIdFieldIdPathParamsSchema
>;

export const dashboardIdPhoneNumberParamsSchema =
  dashboardIdPathParamsSchema.extend({ phone_number: z.string() });
export type DashboardIdPhoneNumberPathParams = z.infer<
  typeof dashboardIdPhoneNumberParamsSchema
>;

export const dashboardIdTagIdPathParamSchema =
  dashboardIdPathParamsSchema.extend({ tag_id: z.string() });
export type DashboardIdTagIdPathParams = z.infer<
  typeof dashboardIdTagIdPathParamSchema
>;

export const errorResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  errorCode: z.string(),
});
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const unknownResponseSchema = z.unknown();

export const collectionMetaSchema = z.object({
  page: z.number(),
  page_size: z.number(),
  total_items: z.number(),
});
export type CollectionMeta = z.infer<typeof collectionMetaSchema>;

export const paginationQuerySchema = z
  .object({
    page: z.number(),
    page_size: z.number(),
  })
  .partial();
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const preprocessArrayToCommaSeparatedString = <T extends ZodSchema>(
  schema: T,
) =>
  z.preprocess(
    (value) => (Array.isArray(value) ? value.join(",") : value),
    schema,
  );

export const preprocessUuid = <T extends ZodSchema>(schema: T) =>
  z.preprocess((value) => (!value ? uuidv7() : value), schema);

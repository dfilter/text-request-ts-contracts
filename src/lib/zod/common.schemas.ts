import { z } from "zod";

export const apiKeySchema = z.string();

export const dashboardIdPathParamsSchema = z.object({ dashboardId: z.number() });

export const dashboardIdFieldIdPathParamsSchema = dashboardIdPathParamsSchema.extend({ fieldId: z.string() });

export const dashboardIdPhoneNumberParamsSchema = dashboardIdPathParamsSchema.extend({ phoneNumber: z.string() });

export const dashboardIdTagIdPathParamSchema = dashboardIdPathParamsSchema.extend({ tagId: z.string() });

export const errorResponseSchema = z.object({ status: z.number(), message: z.string(), errorCode: z.string() });

export const unknownResponseSchema = z.unknown();

export const collectionMetaSchema = z.object({ page: z.number(), page_size: z.number(), total_items: z.number() });

export const paginationQuerySchema = z.object({
  page: z.number(),
  page_size: z.number(),
});

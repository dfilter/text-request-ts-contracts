import { z } from "zod";
import { collectionMetaSchema, dashboardIdPathParamsSchema } from "./common.schemas";

export const keywordSchema = z.object({
  id: z.number().int().gt(0),
  subscribers_count: z.number().int().gte(0),
  keyword_value: z.string(),
  date_created: z.coerce.date(),
  response: z.string().nullable(),
  group_id: z.number().int().gt(0)
})

export const keywordCollectionSchema = z.object({
  items: z.array(keywordSchema),
  meta: collectionMetaSchema,
})

export const createKeywordSchema = z.object({
  keyword_value: z.string().nonempty(),
  response: z.string().nonempty(),
})

export const keywordPathParamSchema = dashboardIdPathParamsSchema.extend({ keyword_id: z.number().int().gt(0) })

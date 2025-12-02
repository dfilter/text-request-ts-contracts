import { z } from "zod";
import {
  collectionMetaSchema,
  dashboardIdPathParamsSchema,
} from "./common.schemas";

export const keywordSchema = z.object({
  id: z.number().int().gt(0),
  subscribers_count: z.number().int().gte(0),
  keyword_value: z.string(),
  date_created: z.coerce.date(),
  response: z.string().nullable(),
  group_id: z.number().int().gt(0),
});
export type Keyword = z.infer<typeof keywordSchema>;

export const keywordCollectionSchema = z.object({
  items: z.array(keywordSchema),
  meta: collectionMetaSchema,
});
export type KeywordCollection = z.infer<typeof keywordCollectionSchema>;

export const keywordCreateSchema = z.object({
  keyword_value: z.string().nonempty(),
  response: z.string().nonempty(),
});
export type KeywordCreate = z.infer<typeof keywordCreateSchema>;

export const keywordPathParamSchema = dashboardIdPathParamsSchema.extend({
  keyword_id: z.number().int().gt(0),
});
export type KeywordPathParams = z.infer<typeof keywordPathParamSchema>;

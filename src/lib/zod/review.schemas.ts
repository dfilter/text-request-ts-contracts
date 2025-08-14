import { z } from "zod";
import {
  collectionMetaSchema,
  dashboardIdPathParamsSchema,
  paginationQuerySchema,
} from "./common.schemas.js";

export const reviewQuerySchema = paginationQuerySchema
  .extend({
    start_date: z.date(),
    end_daet: z.date(),
  })
  .partial();

export const platform = z.enum(["Google", "Facebook", "Text Request"]);

export const source = z.enum(["organic", "requested"]);

export const reviewSchema = z.object({
  id: z.number(),
  platform,
  review_date_utc: z.coerce.date(),
  review_message: z.string(),
  reviewer_name: z.string(),
  star_reating: z.number().nullable(),
  is_positive_recommendation: z.boolean().nullable(),
  reponse_message: z.string().nullable(),
  response_utc: z.coerce.date().nullable(),
  source,
  campaign_id: z.number().nullable(),
  campaign_name: z.string().nullable(),
});

export const reviewCollectionSchema = z.object({
  items: z.array(reviewSchema),
  meta: collectionMetaSchema,
});

export const campaignQuerySchema = paginationQuerySchema
  .extend({
    include_archived: z.boolean(),
  })
  .partial();

export const campaignSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_link: z.string(),
  date_created: z.coerce.date(),
  is_archived: z.boolean(),
});

export const campaignCollectionSchema = z.object({
  items: z.array(campaignSchema),
  meta: collectionMetaSchema,
});

export const campaignPathParamSchema = dashboardIdPathParamsSchema.extend({
  campaign_id: z.number().int().gt(0),
});

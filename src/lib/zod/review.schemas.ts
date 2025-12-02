import { z } from "zod";
import {
  collectionMetaSchema,
  dashboardIdPathParamsSchema,
  paginationQuerySchema,
} from "./common.schemas";

export const reviewQuerySchema = paginationQuerySchema
  .extend({
    start_date: z.date(),
    end_daet: z.date(),
  })
  .partial();
export type ReviewQuery = z.infer<typeof reviewQuerySchema>;

export const platform = z.enum(["Google", "Facebook", "Text Request"]);
export type Platform = z.infer<typeof platform>;

export const source = z.enum(["organic", "requested"]);
export type Source = z.infer<typeof source>;

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
export type Review = z.infer<typeof reviewSchema>;

export const reviewCollectionSchema = z.object({
  items: z.array(reviewSchema),
  meta: collectionMetaSchema,
});
export type ReviewCollection = z.infer<typeof reviewCollectionSchema>;

export const campaignQuerySchema = paginationQuerySchema
  .extend({
    include_archived: z.boolean(),
  })
  .partial();
export type CampaignQuery = z.infer<typeof campaignQuerySchema>;

export const campaignSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_link: z.string(),
  date_created: z.coerce.date(),
  is_archived: z.boolean(),
});
export type Campaign = z.infer<typeof campaignSchema>;

export const campaignCollectionSchema = z.object({
  items: z.array(campaignSchema),
  meta: collectionMetaSchema,
});
export type CampaignCollection = z.infer<typeof campaignCollectionSchema>;

export const campaignPathParamSchema = dashboardIdPathParamsSchema.extend({
  campaign_id: z.number().int().gt(0),
});
export type CampaignPathParam = z.infer<typeof campaignPathParamSchema>;

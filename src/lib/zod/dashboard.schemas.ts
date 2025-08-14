import { z } from "zod";
import { collectionMetaSchema } from "./common.schemas.js";

export const dashboardSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
});
export type Dashboard = z.infer<typeof dashboardSchema>;

export const dashboardCollectionSchema = z.object({
  item: z.array(dashboardSchema),
  meta: collectionMetaSchema,
});
export type DashboardCollection = z.infer<typeof dashboardCollectionSchema>;

export const privisioningQuerySchema = z.object({
  area_code: z.number().int().gte(0),
});
export type ProvisioningQuery = z.infer<typeof privisioningQuerySchema>;

export const provisioningResponseSchema = z.array(z.string());

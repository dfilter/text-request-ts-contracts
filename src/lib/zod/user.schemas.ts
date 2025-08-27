import { z } from "zod";
import {
  collectionMetaSchema,
  paginationQuerySchema,
} from "./common.schemas";

export const permissionSchema = z.object({
  dashboard_id: z.number(),
  role: z.enum(["manager", "csr"]),
});

export const userSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  is_administrator: z.boolean(),
  email: z.string(),
  external_user_id: z.string().nullish(),
  permissions: z.array(permissionSchema),
});

export const createUserSchema = userSchema.extend({
  password: z.string(),
});

export const userCollectionSchema = z.object({
  items: z.array(userSchema),
  meta: collectionMetaSchema,
});

export const userQuerySchema = paginationQuerySchema
  .extend({
    external_user_id: z.string(),
    email: z.string().email(),
  })
  .partial();

export const userIdPathParamSchema = z.object({
  user_id: z.number().int().gt(0),
});

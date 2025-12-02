import { z } from "zod";
import { collectionMetaSchema, paginationQuerySchema } from "./common.schemas";

export const permissionSchema = z.object({
  dashboard_id: z.number(),
  role: z.enum(["manager", "csr"]),
});
export type Permission = z.infer<typeof permissionSchema>;

export const userSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  is_administrator: z.boolean(),
  email: z.string(),
  external_user_id: z.string().nullish(),
  permissions: z.array(permissionSchema),
});
export type User = z.infer<typeof userSchema>;

export const userCreateSchema = userSchema.extend({
  password: z.string(),
});
export type UserCreate = z.infer<typeof userCreateSchema>;

export const userCollectionSchema = z.object({
  items: z.array(userSchema),
  meta: collectionMetaSchema,
});
export type UserCollection = z.infer<typeof userCollectionSchema>;

export const userQuerySchema = paginationQuerySchema
  .extend({
    external_user_id: z.string(),
    email: z.string().email(),
  })
  .partial();
export type UserQuery = z.infer<typeof userQuerySchema>;

export const userIdPathParamSchema = z.object({
  user_id: z.number().int().gt(0),
});
export type UserIdPathParams = z.infer<typeof userIdPathParamSchema>;

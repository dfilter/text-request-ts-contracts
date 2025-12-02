import { initContract } from "@ts-rest/core";
import { errorResponseSchema } from "../lib/zod/common.schemas";
import {
  createUserSchema,
  userCollectionSchema,
  userIdPathParamSchema,
  userQuerySchema,
  userSchema,
} from "../lib/zod/user.schemas";

const contract = initContract();

const userContract = contract.router({
  create: {
    method: "POST",
    path: "/users",
    body: createUserSchema,
    responses: {
      200: userSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  collection: {
    method: "GET",
    path: "/users",
    query: userQuerySchema,
    responses: {
      200: userCollectionSchema,
      401: errorResponseSchema,
    },
  },
  get: {
    method: "GET",
    path: "/users/:user_id",
    pathParams: userIdPathParamSchema,
    responses: {
      200: userSchema,
      204: contract.noBody(),
      401: errorResponseSchema,
    },
  },
  update: {
    method: "PUT",
    path: "/users/:user_id",
    pathParams: userIdPathParamSchema,
    body: userSchema.omit({ id: true }),
    responses: {
      200: userSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  delete: {
    method: "DELETE",
    path: "/users/:user_id",
    pathParams: userIdPathParamSchema,
    responses: {
      204: contract.noBody(),
      401: errorResponseSchema,
      404: contract.noBody(),
    },
  },
});

export default userContract;

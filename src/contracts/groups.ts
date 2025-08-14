import { initContract } from "@ts-rest/core";
import { dashboardIdPathParamsSchema, errorResponseSchema, paginationQuerySchema, unknownResponseSchema } from "../lib/zod/common.schemas.js";
import { createGroupSchema, groupCollectionSchema, groupParamSchema, groupSchema } from "../lib/zod/group.schemas.js";

const contract = initContract();

const groupContract = contract.router({
  create: {
    method: "POST",
    path: "/:dashboardId/groups",
    pathParams: dashboardIdPathParamsSchema,
    body: createGroupSchema,
    responses: {
      200: groupSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Creates a new group",
    description: "Creates a new group with the provided name."
  },
  collection: {
    method: "GET",
    path: "/:dashboardId/groups",
    pathParams: dashboardIdPathParamsSchema,
    query: paginationQuerySchema,
    responses: {
      200: groupCollectionSchema,
      401: errorResponseSchema,
    },
    summary: "Retrieves all groups.",
    description: "Collection of groups."
  },
  get: {
    method: "GET",
    path: "/:dashboardId/groups/:groupId",
    pathParams: groupParamSchema,
    responses: {
      200: groupSchema,
      204: unknownResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Retrieves the group with the specified id.",
    description: "Retrieves the group with the specified id."
  },
  delete: {
    method: "DELETE",
    path: "/:dashboardId/groups/:groupId",
    pathParams: groupParamSchema,
    responses: {
      204: unknownResponseSchema,
      400: unknownResponseSchema,
      401: errorResponseSchema,
      404: unknownResponseSchema,
    },
    summary: "Deletes the group with the specified id.",
    description: "This will succeed even if there are contacts that are members of the group (the contacts will not be deleted)."
  },
  put: {
    method: "PUT",
    path: "/:dashboardId/groups/:groupId",
    pathParams: groupParamSchema,
    body: createGroupSchema,
    responses: {
      200: groupSchema,
      400: unknownResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Update a group with the given id",
    description: "Updates a group's name."
  },
}, {
  pathPrefix: "/dashboards"
});

export default groupContract;

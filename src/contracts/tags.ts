import { initContract } from "@ts-rest/core";
import { dashboardIdPathParamsSchema, dashboardIdTagIdPathParamSchema, errorResponseSchema, paginationQuerySchema, unknownResponseSchema } from "../lib/zod/common.schemas.js";
import { tagCollectionSchema, tagSchema } from "../lib/zod/tag.schemas.js";

const contract = initContract();

const tagContract = contract.router({
  create: {
    method: "POST",
    path: "/:dashboardId/tags",
    pathParams: dashboardIdPathParamsSchema,
    body: tagSchema.omit({ id: true }),
    responses: {
      200: tagSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Creates a new tag",
    description: "Creates a new tag with the provided name and color."
  },
  get: {
    method: "GET",
    path: "/:dashboardId/tags/:tagId",
    pathParams: dashboardIdTagIdPathParamSchema,
    responses: {
      200: tagSchema,
      204: unknownResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Retrieves the tag with the specified id.",
    description: "Retrieves the tag with the specified id, including its name and color."
  },
  collection: {
    method: "GET",
    path: "/:dashboardId/tags/:tagId",
    pathParams: dashboardIdPathParamsSchema,
    query: paginationQuerySchema,
    responses: {
      200: tagCollectionSchema,
      401: errorResponseSchema,
    },
    summary: "Retrieves all the tags for this dashboard.",
    description: "Retrieves all tags."
  },
  put: {
    method: "PUT",
    path: "/:dashboardId/tags/:tagId",
    pathParams: dashboardIdTagIdPathParamSchema,
    body: tagSchema.omit({ id: true }),
    responses: {
      200: tagSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Update a tag with the given id",
    description: "Updates a tag's name or color."
  },
  delete: {
    method: "DELETE",
    path: "/:dashboardId/tags/:tagId",
    pathParams: dashboardIdPathParamsSchema,
    responses: {
      204: unknownResponseSchema,
      400: unknownResponseSchema,
      401: errorResponseSchema,
      404: unknownResponseSchema,
    },
    summary: "Deletes the tag with the specified id.",
    description: "This will succeed even if there are contacts that are tagged (the contacts will not be deleted)."
  },
}, {
  pathPrefix: "/dashboards"
});

export default tagContract;

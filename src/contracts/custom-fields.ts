import { initContract } from "@ts-rest/core";
import { dashboardIdFieldIdPathParamsSchema, dashboardIdPathParamsSchema, errorResponseSchema, unknownResponseSchema } from "../lib/zod/common.schemas.js";
import { customFieldSchema } from "../lib/zod/custom-field.schemas.js";

const contract = initContract();

const customFieldContract = contract.router({
  create: {
    method: "POST",
    path: "/:dashboardId/fields",
    pathParams: dashboardIdPathParamsSchema,
    body: customFieldSchema.omit({ id: true }),
    responses: {
      200: customFieldSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Create a new custom field.",
    description: "Create a custom field with the provided name."
  },
  get: {
    method: "GET",
    path: "/:dashboardId/fields/:fieldId",
    pathParams: dashboardIdFieldIdPathParamsSchema,
    responses: {
      200: customFieldSchema,
      204: unknownResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Retrieves the custom field with the specified id.",
    description: "Retrieves the custom field with the specified id."
  },
  collection: {
    method: "GET",
    path: "/:dashboardId/fields",
    pathParams: dashboardIdPathParamsSchema,
    responses: {
      200: customFieldSchema.array(),
      204: unknownResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Retrieves all custom fields.",
    description: "All custom fields will be returned."
  },
  update: {
    method: "PUT",
    path: "/:dashboardId/fields/:fieldId",
    pathParams: dashboardIdFieldIdPathParamsSchema,
    body: customFieldSchema.omit({ id: true }),
    responses: {
      200: customFieldSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Updates a custom field's name.",
    description: "Updates a custom field's name."
  },
  delete: {
    method: "DELETE",
    path: "/:dashboardId/fields/:fieldId",
    pathParams: dashboardIdFieldIdPathParamsSchema,
    responses: {
      204: unknownResponseSchema,
      400: unknownResponseSchema,
      401: errorResponseSchema,
      404: unknownResponseSchema
    }
  }
}, {
  pathPrefix: "/dashboards"
});

export default customFieldContract;

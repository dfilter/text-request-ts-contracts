import { initContract } from "@ts-rest/core";
import { dashboardCollectionSchema, dashboardSchema, privisioningQuerySchema, provisioningResponseSchema } from "../lib/zod/dashboard.schemas.js";
import { dashboardIdPathParamsSchema, errorResponseSchema, paginationQuerySchema, unknownResponseSchema } from "../lib/zod/common.schemas.js";

const contract = initContract();

const dashboardContract = contract.router({
  create: {
    method: "POST",
    path: "/dashboards",
    body: dashboardSchema.omit({ id: true }),
    responses: {
      200: dashboardSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    }
  },
  collection: {
    method: "GET",
    path: "/dashboards",
    query: paginationQuerySchema,
    responses: {
      200: dashboardCollectionSchema,
      401: errorResponseSchema,
    }
  },
  get: {
    method: "GET",
    path: "/dashboards/:dashboardId",
    pathParams: dashboardIdPathParamsSchema,
    responses: {
      200: dashboardSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    }
  },
  provisioning: {
    method: "GET",
    path: "/dashboards/provisioning",
    query: privisioningQuerySchema,
    responses: {
      200: provisioningResponseSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    }
  },
  update: {
    method: "PUT",
    path: "/dashboards/:dashboardId",
    pathParams: dashboardIdPathParamsSchema,
    body: dashboardSchema.omit({ id: true, phone: true }),
    responses: {
      200: dashboardSchema,
      401: errorResponseSchema,
    }
  },
  delete: {
    method: "DELETE",
    path: "/dashboards/:dashboardId",
    pathParams: dashboardIdPathParamsSchema,
    responses: {
      204: unknownResponseSchema,
      400: unknownResponseSchema,
      401: errorResponseSchema,
      404: unknownResponseSchema,
    }
  }
});

export default dashboardContract;

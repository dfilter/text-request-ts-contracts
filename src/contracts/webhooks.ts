import { initContract } from "@ts-rest/core";
import {
  eventTypeSchema,
  webhookCreateSchema,
  webhookPathParams,
  webhookSchema,
  webhookCollectionSchema,
} from "../lib/zod/webhook.schemas";
import {
  dashboardIdPathParamsSchema,
  errorResponseSchema,
  paginationQuerySchema,
  unknownResponseSchema,
} from "../lib/zod/common.schemas";

const contract = initContract();

const webhookContract = contract.router({
  create: {
    method: "POST",
    path: "/dashboards/:dashboard_id/hooks",
    pathParams: dashboardIdPathParamsSchema,
    body: webhookCreateSchema,
    responses: {
      201: webhookSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
      409: errorResponseSchema,
    },
  },
  getEventTypes: {
    method: "GET",
    path: "/eventTypes",
    responses: {
      200: eventTypeSchema,
      401: errorResponseSchema,
    },
  },
  collection: {
    method: "GET",
    path: "/dashboards/:dashboard_id/hooks",
    pathParams: dashboardIdPathParamsSchema,
    query: paginationQuerySchema,
    responses: {
      200: webhookCollectionSchema,
      401: errorResponseSchema,
    },
  },
  update: {
    method: "PUT",
    path: "/dashboards/:dashboard_id/hooks/:webhook_id",
    pathParams: webhookPathParams,
    body: contract.noBody(),
    responses: {
      204: unknownResponseSchema,
      401: errorResponseSchema,
    },
  },
  delete: {
    method: "DELETE",
    path: "/dashboards/:dashboard_id/hooks/:webhook_id",
    pathParams: webhookPathParams,
    responses: {
      204: unknownResponseSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
});

export default webhookContract;

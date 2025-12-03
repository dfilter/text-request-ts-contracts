import { contract } from "../lib/ts-rest";
import {
  dashboardIdPathParamsSchema,
  errorResponseSchema,
  paginationQuerySchema,
} from "../lib/zod/common.schemas";
import {
  eventTypeSchema,
  webhookCollectionSchema,
  webhookCreateSchema,
  webhookPathParams,
  webhookSchema,
} from "../lib/zod/webhook.schemas";

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
      204: contract.noBody(),
      401: errorResponseSchema,
    },
  },
  delete: {
    method: "DELETE",
    path: "/dashboards/:dashboard_id/hooks/:webhook_id",
    pathParams: webhookPathParams,
    responses: {
      204: contract.noBody(),
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
});

export default webhookContract;

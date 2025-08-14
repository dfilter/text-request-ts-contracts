import { initContract } from "@ts-rest/core";
import {
  dashboardIdPathParamsSchema,
  errorResponseSchema,
  unknownResponseSchema,
} from "../lib/zod/common.schemas.js";
import {
  activatePaymentSchema,
  paymentCollectionSchema,
  paymentCreateSchema,
  paymentPathParamSchema,
  paymentQuerySchema,
  paymentSchema,
} from "../lib/zod/payment.schema.js";

const contract = initContract();

const paymentContract = contract.router({
  create: {
    method: "POST",
    path: "/dashboards/:dashboardId/payments",
    pathParams: dashboardIdPathParamsSchema,
    body: paymentCreateSchema,
    responses: {
      200: paymentSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  markAsPaid: {
    method: "POST",
    path: "/dashboards/:dashboardId/payments/:payment_id/mark_as_paid",
    pathParams: paymentPathParamSchema,
    body: contract.noBody(),
    responses: {
      200: paymentSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  cancel: {
    method: "POST",
    path: "/dashboards/:dashboardId/payments/:payment_id/cancel",
    pathParams: paymentPathParamSchema,
    body: contract.noBody(),
    responses: {
      200: paymentSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  resend: {
    method: "POST",
    path: "/dashboards/:dashboardId/payments/:payment_id/resend",
    pathParams: paymentPathParamSchema,
    body: contract.noBody(),
    responses: {
      200: paymentSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  activatePayments: {
    method: "POST",
    path: "/dashboards/:dashboardId/activate_payments",
    pathParams: dashboardIdPathParamsSchema,
    body: activatePaymentSchema,
    responses: {
      200: paymentSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  collection: {
    method: "GET",
    path: "/dashboards/:dashboardId/payments",
    pathParams: dashboardIdPathParamsSchema,
    query: paymentQuerySchema,
    responses: {
      200: unknownResponseSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  get: {
    method: "GET",
    path: "/dashbords/:dashboardId/payments/:payment_id",
    pathParams: paymentPathParamSchema,
    responses: {
      200: paymentSchema,
      204: unknownResponseSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
});

export default paymentContract;

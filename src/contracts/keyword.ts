import { initContract } from "@ts-rest/core";
import {
  dashboardIdPathParamsSchema,
  errorResponseSchema,
  paginationQuerySchema,
  unknownResponseSchema,
} from "../lib/zod/common.schemas";
import {
  createKeywordSchema,
  keywordCollectionSchema,
  keywordPathParamSchema,
  keywordSchema,
} from "../lib/zod/keyword.schemas";

const contract = initContract();

const keywordContract = contract.router({
  create: {
    method: "POST",
    path: "/dashboards/:dashboard_id/keywords",
    pathParams: dashboardIdPathParamsSchema,
    body: createKeywordSchema,
    responses: {
      200: keywordSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  collection: {
    method: "GET",
    path: "/dashboards/:dashboard_id/keywords",
    pathParams: dashboardIdPathParamsSchema,
    query: paginationQuerySchema,
    responses: {
      200: keywordCollectionSchema,
      401: errorResponseSchema,
    },
  },
  get: {
    method: "GET",
    path: "/dashboards/:dashboard_id/keywords/:keyword_id",
    pathParams: keywordPathParamSchema,
    responses: {
      200: keywordSchema,
      204: unknownResponseSchema,
      401: errorResponseSchema,
    },
  },
  update: {
    method: "PUT",
    path: "/dashboards/:dashboard_id/keywords/:keyword_id",
    pathParams: keywordPathParamSchema,
    body: createKeywordSchema,
    responses: {
      200: keywordSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  delete: {
    method: "DELETE",
    path: "/dashboards/:dashboard_id/keywords/:keyword_id",
    pathParams: keywordPathParamSchema,
    responses: {
      204: unknownResponseSchema,
      400: unknownResponseSchema,
      401: errorResponseSchema,
      404: unknownResponseSchema,
    },
  },
});

export default keywordContract;

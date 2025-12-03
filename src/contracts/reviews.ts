import { contract } from "../lib/ts-rest";
import {
  dashboardIdPathParamsSchema,
  errorResponseSchema,
} from "../lib/zod/common.schemas";
import {
  campaignCollectionSchema,
  campaignPathParamSchema,
  campaignSchema,
  reviewCollectionSchema,
  reviewQuerySchema,
} from "../lib/zod/review.schemas";

const reviewContract = contract.router({
  reviews: {
    method: "GET",
    path: "/dashboards/:dashboard_id/reviews",
    pathParams: dashboardIdPathParamsSchema,
    query: reviewQuerySchema,
    responses: {
      200: reviewCollectionSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  campaigns: {
    method: "GET",
    path: "/dashboards/:dashboard_id/campaigns",
    pathParams: dashboardIdPathParamsSchema,
    query: campaignCollectionSchema,
    responses: {
      200: reviewCollectionSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
  },
  getCampaign: {
    method: "GET",
    path: "/dashboards/:dashboard_id/campaigns/:campaign_id",
    pathParams: campaignPathParamSchema,
    responses: {
      200: campaignSchema,
      204: contract.noBody(),
      401: errorResponseSchema,
    },
  },
});

export default reviewContract;

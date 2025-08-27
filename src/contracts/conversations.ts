import { initContract } from "@ts-rest/core";
import {
  dashboardIdPathParamsSchema,
  dashboardIdPhoneNumberParamsSchema,
  errorResponseSchema,
  unknownResponseSchema,
} from "../lib/zod/common.schemas";
import {
  conversationCollection,
  conversationQuerySchema,
} from "../lib/zod/converation.schemas";
import { commonContract } from "./common";

const contract = initContract();

const conversationContract = contract.router({
  create: commonContract.messageeContact,
  collection: {
    method: "GET",
    path: "/dashboards/:dashboard_id/conversations",
    pathParams: dashboardIdPathParamsSchema,
    query: conversationQuerySchema,
    responses: {
      200: conversationCollection,
      204: unknownResponseSchema,
      401: errorResponseSchema,
    },
  },
  contactCollection: commonContract.contactMessageCollection,
  dashboardMessageCollection: commonContract.dashboardMessageCollection,
  archive: {
    method: "PUT",
    path: "/dashboards/:dashboard_id/contacts/:phone_number/conversations/archive",
    pathParams: dashboardIdPhoneNumberParamsSchema,
    body: contract.noBody(),
    responses: {
      200: unknownResponseSchema,
      401: errorResponseSchema,
    },
  },
  unarchive: {
    method: "PUT",
    path: "/dashboards/:dashboard_id/contacts/:phone_number/conversations/unarchive",
    pathParams: dashboardIdPhoneNumberParamsSchema,
    body: contract.noBody(),
    responses: {
      200: unknownResponseSchema,
      401: errorResponseSchema,
    },
  },
});

export default conversationContract;

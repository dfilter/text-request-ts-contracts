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
} from "../lib/zod/conversation.schemas";
import { commonContract } from "./common";

const contract = initContract();

const conversationContract = contract.router({
  create: commonContract.messageContact,
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
    summary: "Retrieves all conversations for this dashboard.",
    description:
      "Retrieves the last message across all conversations in this dashboard.",
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
    summary: "Archive a Conversation",
    description:
      "Archiving a conversation removes it from the results of all conversation retrieval endpoints. A conversation will be automatically unarchive if the customer sends a text to your Text Request number, or if you send the customer a text from your Text Request number. Archiving conversations is a good way to remove clutter from customers that you don’t plan on talking to in the future. Note that if a customer texts in 'STOP' to prevent you from sending them any further SMS messages, the conversation is automatically archived.",
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
    summary: "Unarchive a Conversation",
    description:
      "Unarchive a conversation. Once a conversation is unarchived, it will once again appear in the queue. it will also appear in conversations returned by the /conversations endpoint. If a conversation is already unarchived, this method has no effect.",
  },
});

export default conversationContract;

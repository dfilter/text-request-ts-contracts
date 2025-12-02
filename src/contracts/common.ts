import { initContract } from "@ts-rest/core";
import {
  dashboardIdPathParamsSchema,
  dashboardIdPhoneNumberParamsSchema,
  errorResponseSchema,
} from "../lib/zod/common.schemas";
import {
  createContactMessageSchema,
  messageCollectionSchema,
  messageSchema,
} from "../lib/zod/message.schemas";

const contract = initContract();

export const commonContract = contract.router({
  messageContact: {
    method: "POST",
    path: "/dashboards/:dashboard_id/contacts/:phone_number/messages",
    pathParams: dashboardIdPhoneNumberParamsSchema,
    body: createContactMessageSchema,
    responses: {
      200: messageSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Send a message to the contact with the given phone number",
    description:
      "Sends a message (starting a new conversation if the given phone number has no message history). You can optionally specify a delivery status callback URL to track the status of the message on a third-party site. Upon successful execution, a message will be in a 'sent' status. If a delivery callback URL is specified, you will receive either a delivered callback, or an error callback with a status code explaining the issue. Messages are sent at the throttle rate on your dashboard. The throttle rate is defined as your 10DLC message rate, or at one message per second for non-10dlc registered dashboards. Sent messages can also include Location requests. Location requests are urls sent in texts that contacts can access to send their location to Text Request. This info will be shown in their queue, but can also be sent via a callback to some third-party url. Location requests can be done in one of two ways: Set geolocation_requested to true in the request body. This will add the phrase 'Go to to share your location' Add the tag [LocationRequest] to your message body. This tag will be replaced by the text request url. Location requests can also have a callback that is returned when the location request is completed by the contact. This information will be sent as a POST request to the location_callback property. See the callbacks tab below for the schema of the callback. WARNING: The location_callback property only works with the [LocationRequest] tag. If no tag exists, even if geolocation_requested is true, the callback will not work and the send-message request will return a 400 (Bad Request) exception.",
  },
  contactMessageCollection: {
    method: "GET",
    path: "/dashboards/:dashboard_id/contacts/:phone_number/messages",
    pathParams: dashboardIdPhoneNumberParamsSchema,
    responses: {
      200: messageCollectionSchema,
      204: contract.noBody(),
      401: errorResponseSchema,
    },
    summary: "Get a conversation's messages by contact phone.",
    description:
      "Retrieves the conversation between the specified dashboard and phone number.",
  },
  dashboardMessageCollection: {
    method: "GET",
    path: "/dashboards/:dashboard_id/messages",
    pathParams: dashboardIdPathParamsSchema,
    responses: {
      200: messageCollectionSchema,
      204: contract.noBody(),
      401: errorResponseSchema,
    },
    summary: "Get all messages for a dashboard.",
    description:
      "Retrieves the text messages sent and received in the specified dashboard. Optionally, can provide a start and end date to filter the message history by. Messages will always be sorted from oldest to newest",
  },
});

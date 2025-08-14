import { initContract } from "@ts-rest/core";
import { createContactMessageSchema, createMessageResponseSchema, messageCollectionSchema, messageCreateSchema, messageIdParamSchema, messageSchema, mmsErrorMessageSchema, mmsResponseSchema } from "../lib/zod/message.schemas.js";
import { dashboardIdPathParamsSchema, dashboardIdPhoneNumberParamsSchema, errorResponseSchema, unknownResponseSchema } from "../lib/zod/common.schemas.js";
import { commonContract } from "./common.js";

const contract = initContract();

const messageContract = contract.router({
  uploadAttachment: {
    method: "POST",
    path: "/mms",
    contentType: "multipart/form-data",
    body: contract.type<{ file: File }>(),
    responses: {
      200: mmsResponseSchema,
      400: mmsErrorMessageSchema,
      401: mmsErrorMessageSchema,
    },
    summary: "Post an MMS attachment to Text Request.",
    description: "Use this endpoint to post an MMS attachment to Text Request. If successful, mms details including a mms_id unique identifier will be returned. You can use this mms_id when sending MMS messages through the API. Valid file types are csv, jpeg, png, pdf, gif, txt, xlsx, mp4, vcard, vcf. The reason for first uploading an MMS attachment is for speed during reuse. If you are sending multiple messages, you can reuse a single uploaded MMS instead of re-uploading the same attachment multiple times. The max size for attachments is 1MB for PDFs, and 5MB for everything else, but we recommend all files stay below 1MB. Most carriers support individual files that are under 1MB. Anything larger can be sent but will be compressed in a way that affects the quality. A single message can have up to 3 attachments of any size, but the images will be downsized until the total size is no more than 2MB. PDFs can't be compressed like other images and have a max file size of 1MB."
  },
  send: {
    method: "POST",
    path: "/messages",
    body: messageCreateSchema,
    responses: {
      200: createMessageResponseSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Send a message",
    description: "Sends a message through a dashboard in your Text Request account. You can optionally specify a delivery status callback URL to track the status of the message on a third-party site. If a delivery callback URL is specified, you will receive either a delivered callback, or an error callback with a status code explaining the issue. Messages are sent at the throttle rate on your dashboard. The throttle rate is defined as your 10DLC message rate, or at one message per second for non-10dlc registered dashboards. Sent messages can also include Location requests. Location requests are urls sent in texts that contacts can access to send their location to Text Request. This info will be shown in their queue, but can also be sent via a callback to some third-party url. Location requests can be done in one of two ways: Set geolocation_requested to true in the request body. This will add the phrase Go to <text request url> to share your location Add the tag [LocationRequest] to your message body. This tag will be replaced by the text request url. Location requests can also have a callback that is returned when the location request is completed by the contact. This information will be sent as a POST request to the location_callback property. See the callbacks tab below for the schema of the callback. WARNING: The location_callback property only works with the [LocationRequest] tag. If no tag exsits, even if geolocation_requested is true, the callback will not work and the send-message request will return a 400 (Bad Request) exception."
  },
  create: commonContract.messageeContact,
  contactCollection: commonContract.contactMessageCollection,
  collection: commonContract.dashboardMessageCollection,
  redact: {
    method: "PUT",
    path: "/messages/:messageId/redact",
    pathParams: messageIdParamSchema,
    body: contract.noBody(),
    responses: {
      200: unknownResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Redact a message",
    description: "Redacts a previously sent message in the Text Request queue. This does not undo sending the message, but hides the message body on Text Request's side in case the message body contains sensitive information. This operation can be undone with the /messages/{message_id}/unredact endpoint."
  },
  unredact: {
    method: "PUT",
    path: "/messages/:messageId/unredact",
    pathParams: messageIdParamSchema,
    body: contract.noBody(),
    responses: {
      200: unknownResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Unredact a message",
    description: "Removes the redaction on a previously redacted message in the Text Request queue. See the /messages/{message_id}/redact endpoint."
  },
});

export default messageContract;

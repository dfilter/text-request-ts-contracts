import { initContract } from "@ts-rest/core";

import { contactQueryParamsSchema, fullContactSchema, contactsCollectionSchema, contactSchema, contactUpdateFields } from "../lib/zod/contact.schemas.js";
import { dashboardIdPathParamsSchema, dashboardIdPhoneNumberParamsSchema, errorResponseSchema, unknownResponseSchema } from '../lib/zod/common.schemas.js';

const contract = initContract();

export const contactContract = contract.router({
  upsertCollection: {
    method: "POST",
    path: "/:dashboardId/contacts",
    pathParams: dashboardIdPathParamsSchema,
    body: contactSchema.array(),
    responses: {
      200: fullContactSchema.array(),
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Bulk update contacts, updating contacts with matching phone numbers or creating new contacts for new phone numbers.",
    description: "Only the dashboard specified will have contacts added; contacts are organized by dashboard, and there is no account level search for a number available."
  },
  upsert: {
    method: "POST",
    path: "/:dashboardId/contacts/:phoneNumber",
    pathParams: dashboardIdPhoneNumberParamsSchema,
    body: contactSchema,
    responses: {
      200: fullContactSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Create or update a contact with the given phone number",
    description: "Creates or updates a contact (depending on whether one already exists with the given phone number)."
  },
  collection: {
    method: 'GET',
    path: '/:dashboardId/contacts',
    pathParams: dashboardIdPathParamsSchema,
    query: contactQueryParamsSchema,
    responses: {
      200: contactsCollectionSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: 'Retrieves all contacts that match the specified filtering criterion.',
    description: "As many as all filter parameters and as few as none may be set. Only the dashboard specified will be searched; contacts are organized by dashboard, and there is no account level search for a number available."
  },
  get: {
    method: "GET",
    path: '/:dashboardId/contacts/:phoneNumber',
    pathParams: dashboardIdPhoneNumberParamsSchema,
    responses: {
      200: fullContactSchema,
      204: unknownResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Retrieves the contact with the specified phone number.",
    description: "If a contact does not yet exist with this phone number in this dashboard, no content will be returned, and no error will be thrown. Only the dashboard specified will be searched; contacts are organized by dashboard, and there is no account level search for a number available.",
  },
  put: {
    method: "PATCH",
    path: '/:dashboardId/contacts/:phoneNumber',
    pathParams: dashboardIdPhoneNumberParamsSchema,
    body: contactUpdateFields,
    responses: {
      200: fullContactSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    description: "Adds or removes a group, contact tag, or custom field to a contact (depending on the secondary boolean value in the request body)"
  },
  delete: {
    method: "DELETE",
    path: '/:dashboardId/contacts/:phoneNumber',
    pathParams: dashboardIdPhoneNumberParamsSchema,
    responses: {
      200: unknownResponseSchema,
      400: unknownResponseSchema,
      401: errorResponseSchema,
      404: unknownResponseSchema,
    },
    summary: "Deletes the contact with the specified phone number.",
    description: "If a contact does not exist with this phone number in this dashboard, no content will be returned. If a contact does exist, but has no message history, no content will be returned, and a successful status code will indicate it was deleted. If a contact has any message history, it cannot be deleted, then a Bad Request error will be returned."
  }
}, {
  pathPrefix: "/dashboards",
});

import { contract } from "../lib/ts-rest";
import {
  dashboardIdPathParamsSchema,
  errorResponseSchema,
  paginationQuerySchema,
} from "../lib/zod/common.schemas";
import {
  dashboardCollectionSchema,
  dashboardSchema,
  provisioningQuerySchema,
  provisioningResponseSchema,
} from "../lib/zod/dashboard.schemas";

const dashboardContract = contract.router({
  create: {
    method: "POST",
    path: "/dashboards",
    body: dashboardSchema.omit({ id: true }),
    responses: {
      200: dashboardSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Create a new dashboard with the given name and phone number",
    description:
      "Creates a new dashboard in the account. Once the dashboard is created, admins will be emailed about the changed, and can begin assigning users. This endpoint can make a dashboard for any provisioned numbers. You can search for provisioned numbers in a specific area code using GET /dashboards/provisioning. If the phone number is already in use, a Bad Request exception will be thrown.",
  },
  collection: {
    method: "GET",
    path: "/dashboards",
    query: paginationQuerySchema,
    responses: {
      200: dashboardCollectionSchema,
      401: errorResponseSchema,
    },
    summary: "Get all dashboards in an account.",
    description: "Returns all dashboards in an account.",
  },
  get: {
    method: "GET",
    path: "/dashboards/:dashboard_id",
    pathParams: dashboardIdPathParamsSchema,
    responses: {
      200: dashboardSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Get info on this specific dashboard",
    description: "Returns the name and phone of the dashboard.",
  },
  provisioning: {
    method: "GET",
    path: "/dashboards/provisioning",
    query: provisioningQuerySchema,
    responses: {
      200: provisioningResponseSchema,
      400: errorResponseSchema,
      401: errorResponseSchema,
    },
    summary: "Get available provisioned numbers for hosting with a dashboard",
    description:
      "Returns a list of 30 provisioning numbers. These numbers can be used for creating a dashboard with POST /dashboards. All numbers and area codes must be in the United States. Text Request only hosts numbers with the +1 country code.",
  },
  update: {
    method: "PUT",
    path: "/dashboards/:dashboard_id",
    pathParams: dashboardIdPathParamsSchema,
    body: dashboardSchema.omit({ id: true, phone: true }),
    responses: {
      200: dashboardSchema,
      401: errorResponseSchema,
    },
    summary: "Update a specific dashboard's name",
    description:
      "Updates a dashboard. This does not change a dashboard's phone number. If you want a new number with another dashboard's contacts, you will have to create a new dashboard with a POST and add the contacts with a bulk export/import.",
  },
  delete: {
    method: "DELETE",
    path: "/dashboards/:dashboard_id",
    pathParams: dashboardIdPathParamsSchema,
    responses: {
      204: contract.noBody(),
      400: contract.noBody(),
      401: errorResponseSchema,
      404: contract.noBody(),
    },
    summary: "Deletes the specified dashboard.",
  },
});

export default dashboardContract;

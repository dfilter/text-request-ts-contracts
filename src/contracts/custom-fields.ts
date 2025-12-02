import { initContract } from "@ts-rest/core";
import {
  dashboardIdFieldIdPathParamsSchema,
  dashboardIdPathParamsSchema,
  errorResponseSchema,
} from "../lib/zod/common.schemas";
import { customFieldSchema } from "../lib/zod/custom-field.schemas";

const contract = initContract();

const customFieldContract = contract.router(
  {
    create: {
      method: "POST",
      path: "/:dashboard_id/fields",
      pathParams: dashboardIdPathParamsSchema,
      body: customFieldSchema.omit({ id: true }),
      responses: {
        200: customFieldSchema,
        400: errorResponseSchema,
        401: errorResponseSchema,
      },
      summary: "Create a new custom field.",
      description: "Create a custom field with the provided name.",
    },
    get: {
      method: "GET",
      path: "/:dashboard_id/fields/:field_id",
      pathParams: dashboardIdFieldIdPathParamsSchema,
      responses: {
        200: customFieldSchema,
        204: contract.noBody(),
        401: errorResponseSchema,
      },
      summary: "Retrieves the custom field with the specified id.",
      description: "Retrieves the custom field with the specified id.",
    },
    collection: {
      method: "GET",
      path: "/:dashboard_id/fields",
      pathParams: dashboardIdPathParamsSchema,
      responses: {
        200: customFieldSchema.array(),
        401: errorResponseSchema,
      },
      summary: "Retrieves all custom fields.",
      description: "All custom fields will be returned.",
    },
    update: {
      method: "PUT",
      path: "/:dashboard_id/fields/:field_id",
      pathParams: dashboardIdFieldIdPathParamsSchema,
      body: customFieldSchema.omit({ id: true }),
      responses: {
        200: customFieldSchema,
        400: errorResponseSchema,
        401: errorResponseSchema,
      },
      summary: "Updates a custom field's name.",
      description: "Updates a custom field's name.",
    },
    delete: {
      method: "DELETE",
      path: "/:dashboard_id/fields/:field_id",
      pathParams: dashboardIdFieldIdPathParamsSchema,
      responses: {
        204: contract.noBody(),
        400: contract.noBody(),
        401: errorResponseSchema,
        404: contract.noBody(),
      },
    },
  },
  {
    pathPrefix: "/dashboards",
  },
);

export default customFieldContract;

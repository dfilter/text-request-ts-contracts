import { contract } from "../lib/ts-rest";
import {
  dashboardIdPathParamsSchema,
  dashboardIdTagIdPathParamSchema,
  errorResponseSchema,
  paginationQuerySchema,
} from "../lib/zod/common.schemas";
import { tagCollectionSchema, tagSchema } from "../lib/zod/tag.schemas";

const tagContract = contract.router(
  {
    create: {
      method: "POST",
      path: "/:dashboard_id/tags",
      pathParams: dashboardIdPathParamsSchema,
      body: tagSchema.omit({ id: true }),
      responses: {
        200: tagSchema,
        400: errorResponseSchema,
        401: errorResponseSchema,
      },
      summary: "Creates a new tag",
      description: "Creates a new tag with the provided name and color.",
    },
    get: {
      method: "GET",
      path: "/:dashboard_id/tags/:tag_id",
      pathParams: dashboardIdTagIdPathParamSchema,
      responses: {
        200: tagSchema,
        204: contract.noBody(),
        401: errorResponseSchema,
      },
      summary: "Retrieves the tag with the specified id.",
      description:
        "Retrieves the tag with the specified id, including its name and color.",
    },
    collection: {
      method: "GET",
      path: "/:dashboard_id/tags",
      pathParams: dashboardIdPathParamsSchema,
      query: paginationQuerySchema,
      responses: {
        200: tagCollectionSchema,
        401: errorResponseSchema,
      },
      summary: "Retrieves all the tags for this dashboard.",
      description: "Retrieves all tags.",
    },
    put: {
      method: "PUT",
      path: "/:dashboard_id/tags/:tag_id",
      pathParams: dashboardIdTagIdPathParamSchema,
      body: tagSchema.omit({ id: true }),
      responses: {
        200: tagSchema,
        400: errorResponseSchema,
        401: errorResponseSchema,
      },
      summary: "Update a tag with the given id",
      description: "Updates a tag's name or color.",
    },
    delete: {
      method: "DELETE",
      path: "/:dashboard_id/tags/:tag_id",
      pathParams: dashboardIdPathParamsSchema,
      responses: {
        204: contract.noBody(),
        400: contract.noBody(),
        401: errorResponseSchema,
        404: contract.noBody(),
      },
      summary: "Deletes the tag with the specified id.",
      description:
        "This will succeed even if there are contacts that are tagged (the contacts will not be deleted).",
    },
  },
  {
    pathPrefix: "/dashboards",
  },
);

export default tagContract;

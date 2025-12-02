import { initClient } from "@ts-rest/core";
import { describe, expect, test } from "vitest";
import dashboardContract from "../src/contracts/dashboards";
import {
  dashboardCollectionSchema,
  dashboardSchema,
  provisioningResponseSchema,
} from "../src/lib/zod/dashboard.schemas";
import { env } from "./env";

describe.concurrent("dashboardContract", () => {
  const client = initClient(dashboardContract, {
    baseUrl: "https://api.textrequest.com/api/v3",
    baseHeaders: {
      "X-API-KEY": env.API_TOKEN,
    },
    validateResponse: true,
    throwOnUnknownStatus: true,
  });

  test("collection", async () => {
    const res = await client.collection();
    expect(res.status).toBe(200);

    const { success } = dashboardCollectionSchema.safeParse(res.body);
    expect(success).toBeTruthy();
  });

  test("provisioning", async () => {
    const res = await client.provisioning({ query: { area_code: 423 } });

    expect(res.status).toBe(200);

    const { success } = provisioningResponseSchema.safeParse(res.body);
    expect(success).toBeTruthy();
  });

  test("get", async () => {
    const res = await client.get({
      params: { dashboard_id: env.DASHBOARD_ID },
    });

    expect(res.status).toBe(200);

    const { success } = dashboardSchema.safeParse(res.body);
    expect(success).toBeTruthy();
  });

  // These are skipped since we don't want to provision a new dashboard.
  // TODO: Create a mock api to test this.
  describe.sequential
    .skip("dashboard crud", () => {
      let dashboardId: number | null = null;

      test("create", async () => {
        const name = "Test Dashboard";
        const phone = "11234567890";

        const res = await client.create({
          body: {
            name,
            phone,
          },
        });

        expect(res.status).toBe(200);
        if (res.status === 200) {
          dashboardId = res.body.id;
          expect(res.body.name).toBe(name);
          expect(res.body.phone).toBe(phone);
        }

        const { success } = dashboardSchema.safeParse(res.body);
        expect(success).toBeTruthy();
      });

      test("get", async () => {
        expect(dashboardId).toBeTruthy();
        if (!dashboardId) return;

        const res = await client.get({
          params: { dashboard_id: dashboardId },
        });

        expect(res.status).toBe(200);

        const { success } = dashboardSchema.safeParse(res.body);
        expect(success).toBeTruthy();
      });

      test("update", async () => {
        expect(dashboardId).toBeTruthy();
        if (!dashboardId) return;

        const name = "Test Dashboard Updated";

        const res = await client.update({
          params: { dashboard_id: dashboardId },
          body: { name },
        });

        expect(res.status).toBe(200);
        if (res.status === 200) {
          expect(res.body.name).toBe(name);
        }

        const { success } = dashboardSchema.safeParse(res.body);
        expect(success).toBeTruthy();
      });

      test("delete", async () => {
        expect(dashboardId).toBeTruthy();
        if (!dashboardId) return;

        const res = await client.delete({
          params: { dashboard_id: dashboardId },
        });
        expect(res.status).toBe(204);
      });
    });
});

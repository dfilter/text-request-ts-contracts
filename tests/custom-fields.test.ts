import { initClient } from "@ts-rest/core";
import { describe, expect, test } from "vitest";
import customFieldContract from "../src/contracts/custom-fields";
import { customFieldSchema } from "../src/lib/zod/custom-field.schemas";
import { env } from "./env";

describe.concurrent("customFieldContract", () => {
  const client = initClient(customFieldContract, {
    baseUrl: "https://api.textrequest.com/api/v3",
    baseHeaders: {
      "X-API-KEY": env.API_TOKEN,
    },
    validateResponse: true,
    throwOnUnknownStatus: true,
  });

  test("get collection", async () => {
    const res = await client.collection({
      params: {
        dashboard_id: env.DASHBOARD_ID,
      },
    });

    expect(res.status).toBe(200);

    const { success } = customFieldSchema.array().safeParse(res.body);
    expect(success).toBeTruthy();
  });

  describe.sequential("create and delete custom field", () => {
    let fieldId: string | null = null;

    test("create custom field", async () => {
      const name = "Test Custom Field 1";

      const res = await client.create({
        params: { dashboard_id: env.DASHBOARD_ID },
        body: { name },
      });

      expect(res.status).toBe(200);
      if (res.status === 200) {
        fieldId = res.body.id;
        expect(res.body.name).toBe(name);
      }

      const { success } = customFieldSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("gets custom field", async () => {
      expect(fieldId).toBeTruthy();
      if (!fieldId) return;

      const res = await client.get({
        params: { dashboard_id: env.DASHBOARD_ID, field_id: fieldId },
      });

      expect(res.status).toBe(200);

      const { success } = customFieldSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("update custom field", async () => {
      const name = "Test Custom Field Updated";
      expect(fieldId).toBeTruthy();
      if (!fieldId) return;

      const res = await client.update({
        params: { dashboard_id: env.DASHBOARD_ID, field_id: fieldId },
        body: { name },
      });

      expect(res.status).toBe(200);
      if (res.status === 200) {
        expect(res.body.name).toBe(name);
      }

      const { success } = customFieldSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("delete custom field", async () => {
      expect(fieldId).toBeTruthy();
      if (!fieldId) return;

      const res = await client.delete({
        params: {
          dashboard_id: env.DASHBOARD_ID,
          field_id: fieldId,
        },
      });

      expect(res.status).toBe(204);
    });
  });
});

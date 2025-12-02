import { initClient } from "@ts-rest/core";
import { describe, expect, test } from "vitest";
import conversationContract from "../src/contracts/conversations";
import { conversationCollection } from "../src/lib/zod/conversation.schemas";
import { env } from "./env";

describe.concurrent("contactContract contract", () => {
  const client = initClient(conversationContract, {
    baseUrl: "https://api.textrequest.com/api/v3",
    baseHeaders: {
      "X-API-KEY": env.API_TOKEN,
    },
    validateResponse: true,
    throwOnUnknownStatus: true,
  });

  test("get conversations collection", async () => {
    const response = await client.collection({
      params: {
        dashboard_id: env.DASHBOARD_ID,
      },
    });

    const result = conversationCollection.safeParse(response.body);

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
  });

  describe("archive and unarchive conversation", () => {
    test("archive contact conversation", async () => {
      const response = await client.archive({
        params: {
          dashboard_id: env.DASHBOARD_ID,
          phone_number: env.PHONE_NUMBER,
        },
      });

      expect(response.status).toBe(200);
    });

    test("un-archive contact conversation", async () => {
      const response = await client.unarchive({
        params: {
          dashboard_id: env.DASHBOARD_ID,
          phone_number: env.PHONE_NUMBER,
        },
      });

      expect(response.status).toBe(200);
    });
  });
});

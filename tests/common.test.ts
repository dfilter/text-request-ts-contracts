import { initClient } from "@ts-rest/core";
import { describe, expect, test } from "vitest";
import { commonContract } from "../src/contracts/common";
import {
  messageCollectionSchema,
  messageSchema,
} from "../src/lib/zod/message.schemas";
import { env } from "./env";

describe.concurrent("common contract", () => {
  const client = initClient(commonContract, {
    baseUrl: "https://api.textrequest.com/api/v3",
    baseHeaders: {
      "X-API-KEY": env.API_TOKEN,
    },
  });

  test("messageContact", async () => {
    const response = await client.messageContact({
      params: {
        dashboard_id: env.DASHBOARD_ID,
        phone_number: env.PHONE_NUMBER,
      },
      body: {
        body: "Test Message",
        sender_name: "Text Request Client",
      },
    });

    expect(response.status).toBe(200);

    const { success, error } = messageSchema.safeParse(response.body);
    if (error) console.error(error);
    expect(success).toBeTruthy();
  });

  test("contactMessageCollection should return contact for dashboard_id and phone_number", async () => {
    const response = await client.contactMessageCollection({
      params: {
        dashboard_id: env.DASHBOARD_ID,
        phone_number: env.PHONE_NUMBER,
      },
    });

    expect(response.status).toBe(200);

    const { error, success } = messageCollectionSchema.safeParse(response.body);
    if (error) console.error(error);
    expect(success).toBeTruthy();
  });

  test("dashboardMessageCollection", async () => {
    const response = await client.dashboardMessageCollection({
      params: { dashboard_id: env.DASHBOARD_ID },
    });

    expect(response.status).toBe(200);

    const { error, success } = messageCollectionSchema.safeParse(response.body);
    if (error) console.error(error);
    expect(success).toBeTruthy();
  });
});

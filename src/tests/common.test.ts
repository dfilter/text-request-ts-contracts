import { initClient } from "@ts-rest/core";
import { test, describe, expect, expectTypeOf, beforeAll } from "vitest";
import { z } from "zod";

import { env } from "./env.js";
import { commonContract } from "../contracts/common.js";
import {
  contactSchema,
  contactsCollectionSchema,
} from "../lib/zod/contact.schemas.js";
import { createContactMessageSchema } from "../lib/zod/message.schemas.js";

describe.concurrent("common contract", () => {
  const client = initClient(commonContract, {
    baseUrl: "https://api.textrequest.com/api/v3",
    baseHeaders: {
      "X-API-KEY": env.API_KEY,
    },
  });

  test("messageeContact", async () => {
    const response = await client.messageeContact({
      params: {
        dashboard_id: env.DASHBOARD_ID,
        phone_number: env.PHONE_NUMBER,
      },
      body: {
        body: "Test Message",
        sender_name: "Text Request Client",
      },
    });

    const parseResult = createContactMessageSchema.safeParse(response.body);

    expect(response.status).toBe(200);
    expect(parseResult.success).toBe(true);
  });

  test("contactMessageCollection should return contact for dashboard_id and phone_number", async () => {
    const response = await client.contactMessageCollection({
      params: {
        dashboard_id: env.DASHBOARD_ID,
        phone_number: env.PHONE_NUMBER,
      },
    });

    const parseResult = contactSchema.safeParse(response.body);

    expect(response.status).toBe(200);
    expect(parseResult.success).toBe(true);
  });

  test("dashboardMessageCollection", async () => {
    const response = await client.dashboardMessageCollection({
      params: { dashboard_id: env.DASHBOARD_ID },
    });

    const parseResult = contactsCollectionSchema.safeParse(response.body);

    expect(response.status).toBe(200);
    expect(parseResult.success).toBe(true);
  });
});

import { initClient } from "@ts-rest/core";
import { test, describe, expect } from "vitest";
import { z } from "zod";

import { env } from "./env.js";
import {
  contactSchema,
  contactsCollectionSchema,
} from "../lib/zod/contact.schemas.js";
import contactContract from "../contracts/contacts.js";

describe.concurrent("contactContract contract", () => {
  const client = initClient(contactContract, {
    baseUrl: "https://api.textrequest.com/api/v3",
    baseHeaders: {
      "X-API-KEY": env.API_KEY,
    },
  });

  test("get contact collection", async () => {
    const response = await client.collection({
      params: {
        dashboard_id: env.DASHBOARD_ID,
      },
    });

    const result = contactsCollectionSchema.safeParse(response.body);

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
  });

  test("get contact", async () => {
    const response = await client.get({
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
    const response = await client.upsert({
      params: {
        dashboard_id: env.DASHBOARD_ID,
        phone_number: env.PHONE_NUMBER,
      },
      body: {
        contact_tags: [],
      },
    });

    const parseResult = contactsCollectionSchema.safeParse(response.body);

    expect(response.status).toBe(200);
    expect(parseResult.success).toBe(true);
  });
});

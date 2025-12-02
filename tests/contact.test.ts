import { initClient } from "@ts-rest/core";
import { describe, expect, test } from "vitest";
import contactContract from "../src/contracts/contacts";
import {
  contactSchema,
  contactsCollectionSchema,
  fullContactSchema,
} from "../src/lib/zod/contact.schemas";
import { env } from "./env";

describe.concurrent("contactContract contract", () => {
  const client = initClient(contactContract, {
    baseUrl: "https://api.textrequest.com/api/v3",
    baseHeaders: {
      "X-API-KEY": env.API_TOKEN,
    },
    validateResponse: true,
    throwOnUnknownStatus: true,
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

    const parseResult = fullContactSchema.safeParse(response.body);

    expect(response.status).toBe(200);
    expect(parseResult.success).toBe(true);
  });
});

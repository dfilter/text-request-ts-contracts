import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initClient } from "@ts-rest/core";
import { describe, expect, test } from "vitest";
import messagesContract from "../src/contracts/messages";
import {
  createMessageResponseSchema,
  messageCollectionSchema,
  mmsResponseSchema,
} from "../src/lib/zod/message.schemas";
import { env } from "./env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe.concurrent("messagesContract", () => {
  const client = initClient(messagesContract, {
    baseUrl: "https://api.textrequest.com/api/v3",
    baseHeaders: {
      "X-API-KEY": env.API_TOKEN,
    },
    validateResponse: true,
    throwOnUnknownStatus: true,
  });

  test("collection", async () => {
    const res = await client.collection({
      params: { dashboard_id: env.DASHBOARD_ID },
    });

    expect(res.status).toBe(200);

    const { success } = messageCollectionSchema.safeParse(res.body);
    expect(success).toBeTruthy();
  });

  test("create mms", async () => {
    const filePath = path.join(__dirname, "test-image.jpg");
    const fileBuffer = await fs.readFile(filePath);
    const file = new File([new Uint8Array(fileBuffer)], "test-file.jpg", {
      type: "image/jpeg",
    });

    const res = await client.uploadAttachment({
      body: { file },
    });

    expect(res.status).toBe(200);

    const { success } = mmsResponseSchema.safeParse(res.body);
    expect(success).toBeTruthy();
  });

  describe.sequential("message redaction", () => {
    let messageId: string | null = null;

    test("message", async () => {
      const res = await client.send({
        body: {
          body: "Test Message",
          from: env.DASHBOARD_PN,
          to: env.PHONE_NUMBER,
          sender_name: "Test Suite",
        },
      });

      expect(res.status).toBe(200);
      if (res.status === 200) {
        messageId = res.body.message_id;
      }

      const { success } = createMessageResponseSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("redact", async () => {
      expect(messageId).toBeTruthy();
      if (!messageId) return;

      const res = await client.redact({ params: { message_id: messageId } });

      expect(res.status).toBe(200);
    });

    test("unredact", async () => {
      expect(messageId).toBeTruthy();
      if (!messageId) return;

      const res = await client.unredact({ params: { message_id: messageId } });

      expect(res.status).toBe(200);
    });
  });
});

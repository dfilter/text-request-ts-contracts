import { initClient } from "@ts-rest/core";
import { describe, expect, test } from "vitest";
import tagsContract from "../src/contracts/tags";
import { tagCollectionSchema, tagSchema } from "../src/lib/zod/tag.schemas";
import { env } from "./env";

describe.concurrent("messagesContract", () => {
  const client = initClient(tagsContract, {
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

    const { success } = tagCollectionSchema.safeParse(res.body);
    expect(success).toBeTruthy();
  });

  describe.sequential("tags CRUD", () => {
    let tagId: string | null = null;

    test("create", async () => {
      const tag = "Test Tag";
      const tag_color = "#000000";

      const res = await client.create({
        params: { dashboard_id: env.DASHBOARD_ID },
        body: { tag, tag_color },
      });

      expect(res.status).toBe(200);
      if (res.status === 200) {
        tagId = res.body.id;
        expect(res.body.tag).toBe(tag);
        expect(res.body.tag_color).toBe(tag_color);
      }

      const { success } = tagSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("get", async () => {
      expect(tagId).toBeTruthy();
      if (!tagId) return;

      const res = await client.get({
        params: { dashboard_id: env.DASHBOARD_ID, tag_id: tagId },
      });

      expect(res.status).toBe(200);

      const { success } = tagSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("put", async () => {
      expect(tagId).toBeTruthy();
      if (!tagId) return;

      const tag = "Updated Test Tag";
      const tag_color = "#ffffff";

      const res = await client.put({
        params: { dashboard_id: env.DASHBOARD_ID, tag_id: tagId },
        body: { tag, tag_color },
      });

      expect(res.status).toBe(200);
      if (res.status === 200) {
        expect(res.body.tag).toBe(tag);
        expect(res.body.tag_color).toBe(tag_color);
      }

      const { success } = tagSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("delete", async () => {
      expect(tagId).toBeTruthy();
      if (!tagId) return;

      const res = await client.delete({
        params: { dashboard_id: env.DASHBOARD_ID, tag_id: tagId },
      });

      expect(res.status).toBe(204);
    });
  });
});

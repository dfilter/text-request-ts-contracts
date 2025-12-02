import { initClient } from "@ts-rest/core";
import { describe, expect, test } from "vitest";
import groupsContract from "../src/contracts/groups";
import {
  groupCollectionSchema,
  groupSchema,
} from "../src/lib/zod/group.schemas";
import { env } from "./env";

describe.concurrent("groupsContract", () => {
  const client = initClient(groupsContract, {
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

    const { success } = groupCollectionSchema.safeParse(res.body);
    expect(success).toBeTruthy();
  });

  describe.sequential("group CRUD", () => {
    let groupId: number | null = null;

    test("create", async () => {
      const name = "Test Group";
      const notes = "This is a test group.";
      const res = await client.create({
        params: { dashboard_id: env.DASHBOARD_ID },
        body: { name, notes },
      });

      expect(res.status).toBe(200);
      if (res.status === 200) {
        groupId = res.body.id;
        expect(res.body.name).toBe(name);
        expect(res.body.notes).toBe(notes);
      }

      const { success } = groupSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("get", async () => {
      expect(groupId).toBeTruthy();
      if (!groupId) return;

      const res = await client.get({
        params: { dashboard_id: env.DASHBOARD_ID, group_id: groupId },
      });

      const { success } = groupSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("put", async () => {
      expect(groupId).toBeTruthy();
      if (!groupId) return;

      const name = "Updated Test Group";
      const notes = "These are updated test notes!";

      const res = await client.put({
        params: { dashboard_id: env.DASHBOARD_ID, group_id: groupId },
        body: { name, notes },
      });

      expect(res.status).toBe(200);
      if (res.status === 200) {
        expect(res.body.name).toBe(name);
        expect(res.body.notes).toBe(notes);
      }

      const { success } = groupSchema.safeParse(res.body);
      expect(success).toBeTruthy();
    });

    test("delete", async () => {
      expect(groupId).toBeTruthy();
      if (!groupId) return;

      const res = await client.delete({
        params: { dashboard_id: env.DASHBOARD_ID, group_id: groupId },
      });

      expect(res.status).toBe(204);
    });
  });
});

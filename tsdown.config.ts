import { defineConfig } from "tsdown";

export default defineConfig([
  {
    external: ["zod", "@ts-rest/core", "uuid"],
    entry: ["./src/index.ts"],
    platform: "neutral",
    dts: true,
  },
]);

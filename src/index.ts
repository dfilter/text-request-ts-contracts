import { initClient as _initClient } from "@ts-rest/core";
import textRequestContract from "./contracts/index.js";

function initClient(apiKey: string) {
  return _initClient(textRequestContract, {
    baseUrl: "https://api.textrequest.com",
    baseHeaders: {
      "X-API-KEY": apiKey,
    },
  });
}

export { textRequestContract };

export default initClient;

import { initContract } from "@ts-rest/core";
import contactContract from "./contacts.js";
import customFieldContract from "./custom-fields.js";
import messageContract from "./messages.js";
import groupContract from "./groups.js";
import dashboardContract from "./dashboards.js";
import conversationContract from "./conversations.js";
import userContract from "./users.js";
import keywordContract from "./keyword.js";
import paymentContract from "./payment.js";
import reviewContract from "./reviews.js";
import webhookContract from "./webhooks.js";

const contract = initContract();

const textRequestContract = contract.router(
  {
    contact: contactContract,
    customField: customFieldContract,
    message: messageContract,
    group: groupContract,
    dashboard: dashboardContract,
    conversation: conversationContract,
    user: userContract,
    keyword: keywordContract,
    payment: paymentContract,
    review: reviewContract,
    webook: webhookContract,
  },
  {
    pathPrefix: "/api/v3",
  },
);

export default textRequestContract;

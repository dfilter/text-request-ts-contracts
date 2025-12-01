import { initContract } from "@ts-rest/core";
import contactContract from "./contacts";
import customFieldContract from "./custom-fields";
import messageContract from "./messages";
import groupContract from "./groups";
import dashboardContract from "./dashboards";
import conversationContract from "./conversations";
import userContract from "./users";
import keywordContract from "./keyword";
import paymentContract from "./payment";
import reviewContract from "./reviews";
import webhookContract from "./webhooks";

const contract = initContract();

export const textRequestContract = contract.router(
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
    webhook: webhookContract,
  },
  {
    pathPrefix: "/api/v3",
  },
);

export {
  contactContract,
  customFieldContract,
  messageContract,
  groupContract,
  dashboardContract,
  conversationContract,
  userContract,
  keywordContract,
  paymentContract,
  reviewContract,
  webhookContract,
};

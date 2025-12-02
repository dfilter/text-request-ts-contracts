import { initContract } from "@ts-rest/core";
import contactContract from "./contacts";
import conversationContract from "./conversations";
import customFieldContract from "./custom-fields";
import dashboardContract from "./dashboards";
import groupContract from "./groups";
import keywordContract from "./keyword";
import messageContract from "./messages";
import paymentContract from "./payment";
import reviewContract from "./reviews";
import userContract from "./users";
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

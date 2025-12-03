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
import tagContract from "./tags";
import userContract from "./users";
import webhookContract from "./webhooks";

const contract = initContract();

export const textRequestContract = contract.router(
  {
    contact: contactContract,
    conversation: conversationContract,
    customField: customFieldContract,
    dashboard: dashboardContract,
    group: groupContract,
    keyword: keywordContract,
    message: messageContract,
    payment: paymentContract,
    review: reviewContract,
    tag: tagContract,
    user: userContract,
    webhook: webhookContract,
  },
  {
    pathPrefix: "/api/v3",
  },
);

export {
  contactContract,
  conversationContract,
  customFieldContract,
  dashboardContract,
  groupContract,
  keywordContract,
  messageContract,
  paymentContract,
  reviewContract,
  tagContract,
  userContract,
  webhookContract,
};

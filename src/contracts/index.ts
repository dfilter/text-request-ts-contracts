import { initContract } from "@ts-rest/core";
import contactContract from "./contacts.js";
import customFieldContract from "./custom-fields.js";
import messageContract from "./messages.js";
import groupContract from "./groups.js";
import dashboardContract from "./dashboards.js";

const contract = initContract();

const textRequestContract = contract.router({
  contact: contactContract,
  customField: customFieldContract,
  message: messageContract,
  group: groupContract,
  dashboard: dashboardContract,
}, {
  pathPrefix: "/api/v3"
});

export default textRequestContract;

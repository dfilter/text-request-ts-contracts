import { initContract } from "@ts-rest/core";
import { contactContract } from "./contacts.js";
import customFieldContract from "./custom-fields.js";

const contract = initContract();

const textRequestContract = contract.router({
  contact: contactContract,
  customField: customFieldContract,
}, {
  pathPrefix: "/api/v3"
});

export default textRequestContract;

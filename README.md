# Text Request Typescript Contracts

Rest api contracts for the [Text Request REST API](https://www.textrequest.com/api/v3) using [ts-rest](https://ts-rest.com/).

## Usage

Creating a client:

```typescript
import { initClient } from "@ts-rest/core";
import { textRequestClient } from "text-request-ts-contracts"

const textRequestClient = initClient(textRequestClient, {
  baseUrl: 'https://api.textrequest.com',
  baseHeaders: {
    "X-API-KEY": "your-api-key-here",
  },
});

async function getContact() {
  const response = await textRequestClient.contact.get({
    params: { dashboard_id: 1, phone_number: "1234567890" },
  });
  if (response.status === 200) {
    const contact = response.body;
    //...
  }
  //...
}
```

If you need to create a test server or something:

```typescript
import { createExpressEndpoints, initServer } from '@ts-rest/express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { textRequestClient } from "text-request-ts-contracts";
import db from "./db";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();
const router = s.router(textRequestClient, {
  contact: {
    get: async ({ params: { dashboard_id, phone_number } }) => {
      const contact = await db.query.contacts.findFirst({
        where: (fields, operators) =>
          operators.and(
            operators.eq(fields.dashboard_id, dashboard_id),
            operators.eq(fields.phone_number, phone_number)
          )
      });

      return {
        status: 200,
        body: contact,
      }
    }
  }
});

createExpressEndpoints(contract, router, app);
```

## Technology used

- [Zod](https://v3.zod.dev/) TypeScript-first schema validation with static type inference.
- [ts-rest](https://ts-rest.com/) Simple cross-stack type-safety for your API, with just a sprinkle of TypeScript magic.

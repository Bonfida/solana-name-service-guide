# Edit domain content

To write data in a domain registry you can use the following code:

```js
import {
  updateNameRegistryData,
  ROOT_DOMAIN_ACCOUNT,
} from "@bonfida/spl-name-service";

const data = Buffer.from("Hello, world!");

// The offset to which the data should be written into the registry, usually 0
const offset = 0;

const ix = await updateNameRegistryData(
  connection,
  name,
  offset,
  data,
  undefined,
  ROOT_DOMAIN_ACCOUNT
);

// sign and send instruction
```

If the data is too large to fit in a single transaction, you will have to update the domain in several transaction by slicing the buffer and increasing the offset accordingly.

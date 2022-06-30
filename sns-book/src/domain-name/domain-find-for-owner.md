# Get all domains of a user

You can retrieve all the domain names of a user with the following `MemcmpFilter`

```js
const filters = [
  {
    memcmp: {
      offset: 32,
      bytes: user.toBase58(),
    },
  },
  {
    memcmp: {
      offset: 0,
      bytes: SOL_TLD_AUTHORITY.toBase58(),
    },
  },
];
```

If you are using `@bonfida/spl-name-service` you can use the following code:

```js
import { getAllDomains } from "@bonfida/spl-name-service";

// ...

const domains = await getAllDomains(connection, user);
```

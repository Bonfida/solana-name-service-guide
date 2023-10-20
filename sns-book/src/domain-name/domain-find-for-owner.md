# Get all domains of a user

If you are using `@bonfida/spl-name-service` you can use the following code:

```js
import { getAllDomains } from "@bonfida/spl-name-service";

// ...

const domains = await getAllDomains(connection, user);
```

The function above will return an array of 2 Public Keys. Use the toBase58() method to convert the keys into a human readable format.

```js
domains.map((domain) => domain.toBase58());
```

Another option to retrieve not only human readable Public Keys, but also the domain name in a human readable string format is to use the following function from spl-name-service library below.

```js
const domainKeysWithStrings = getDomainKeysWithReverses(connection, user);
```

If you opt not to use the spl-name-service library, you can manually retrieve all the domain names of a user with the following `MemcmpFilter` while querying the Solana blockchain.

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

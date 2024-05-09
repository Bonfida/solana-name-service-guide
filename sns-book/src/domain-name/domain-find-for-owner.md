# Get all domains of a user

If you are using `@bonfida/spl-name-service` you can use the following code:

```js
import { getAllDomains } from "@bonfida/spl-name-service";

// ...

const domains = await getAllDomains(connection, user);
```

The function above will return an array of public keys. Use the toBase58() method to convert the public keys into base 58 encoded strings.

```js
domains.map((domain) => domain.toBase58());
```

Another option to retrieve public keys, as well as their corresponding domain names in a string format is to use the function below from the spl-name-service library. The function will return an array of objects including public keys, and their corresponding strings.

```js
const domainsWithReverses = await getDomainKeysWithReverses(connection, user);
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
      bytes: ROOT_DOMAIN_ACCOUNT.toBase58(),
    },
  },
];
```

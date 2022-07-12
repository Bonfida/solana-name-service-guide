# Get all domain names

You can retrieve all the registered domain names using a `getProgramAccounts` request with the following RPC filter

```js
const filters = [
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
import { getAllRegisteredDomains } from "@bonfida/spl-name-service";

// ...

const registeredDomains = await getAllRegisteredDomains(connection);
```

To avoid enormous payload response, `getAllRegisteredDomains` slices the data to only return the owner of the domain (i.e `dataSlice = { offset: 32, length: 32 }`)

```js
/**
 * This function can be used to retrieve all the registered `.sol` domains.
 * The account data is sliced to avoid enormous payload and only the owner is returned
 * @param connection The Solana RPC connection object
 * @returns
 */
export const getAllRegisteredDomains = async (connection: Connection) => {
  const filters = [
    {
      memcmp: {
        offset: 0,
        bytes: ROOT_DOMAIN_ACCOUNT.toBase58(),
      },
    },
  ];
  const dataSlice = { offset: 32, length: 32 };

  const accounts = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
    dataSlice,
    filters,
  });
  return accounts;
};
```

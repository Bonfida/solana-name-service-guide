# Creating a subdomain

This code snippet creates a subdomain and its reverse lookup account:

```js
import {
  createNameRegistry,
  getDomainKey,
  NameRegistryState,
  createReverseName,
} from "@bonfida/spl-name-service";

const ixs: TransactionInstruction[] = [];

const subdomain = "amazing-sub.bonfida.sol";
const { parent, pubkey } = await getDomainKey(subdomain);

// Space allocated to the subdomains
// In this example 2kb but can be more
const space = 2_000;
const lamports = await connection.getMinimumBalanceForRentExemption(
  space + NameRegistryState.HEADER_LEN
);

const ix_create = await createNameRegistry(
  connection,
  "\0".concat("amazing-sub"),
  space, // Hardcode space to 2kB
  owner,
  owner,
  lamports,
  undefined,
  parent
);
ixs.push(ix_create);

// Create the reverse name
const [, ix_reverse] = await createReverseName(
  pubkey,
  "\0".concat("amazing-sub"),
  owner,
  parent,
  owner
);
ixs.push(...ix_reverse);

// Sign an send the tx
```

From `0.2.2` this logic is exported via the `createSubdomain` function

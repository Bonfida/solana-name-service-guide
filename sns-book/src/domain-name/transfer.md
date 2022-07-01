# Transfer domain

Domain names can be transfered using the `transferNameOwnership` instruction:

```js
import {
  transferNameOwnership,
  NameRegistryState,
  SOL_TLD_AUTHORITY,
} from "@bonfida/spl-name-service";

// ..

// Domain name to transfer
const domain = "bonfida";

// New owner of the domain
const newOwner = new PublicKey("...");

const ix = await transferNameOwnership(
  connection,
  domain,
  newOwner,
  undefined,
  SOL_TLD_AUTHORITY
);

// sign and send instruction
```

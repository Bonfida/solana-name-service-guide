# Transfer domain

Domain names can be transferred using the `transferNameOwnership` instruction:

```js
import {
  transferNameOwnership,
  NameRegistryState,
  ROOT_DOMAIN_ACCOUNT,
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
  ROOT_DOMAIN_ACCOUNT
);

// sign and send instruction
```

# Direct look up

In order to get the information of a domain name you need to:

1. Hash the domain name
2. Derive a PDA from the hash
3. Retrieve the account info

```js
import {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
} from "@bonfida/spl-name-service";

const domainName = "bonfida"; // Without the .sol

// Step 1
const hashedName = await getHashedName(domainName);

// Step 2
const domainKey = await getNameAccountKey(
  hashedName,
  undefined,
  SOL_TLD_AUTHORITY
);

// Step 3
// The registry object contains all the info about the domain name (cf struct above)
// The NFT owner is of type PublicKey | undefined
const { registry, nftOwner } = await NameRegistryState.retrieve(
  connection,
  domainKey
);
```

The `retrieve` method returns an object made of two fields:

- `registry` is of type `NameRegistryState`
- `nftOwner` is of type `PublicKey | undefined`
  - When `nftOwner` is of type `PublicKey` it means that the domain is tokenized and the current NFT holder is `nftOwner`. When a domain is tokenized `registry.owner` is an escrow account that is program owner. Funds should be sent to `nftOwner`
  - When `nftOwner` is of type `undefined` it means that the domain is not tokenized and funds should be sent to `registry.owner`

<h1 align="center"> Solana name service guide</h1>
<br />
<p align="center">
<img width="250" src="https://i.imgur.com/nn7LMNV.png"/>
</p>
<br />
<p align="center">
<a href="https://badge.fury.io/js/@bonfida%2Fspl-name-service"><img src="https://badge.fury.io/js/@bonfida%2Fspl-name-service.svg" alt="npm version" height="18"></a>
</p>
<br />

⚠️ In version `0.1.26` the signature of `NameRegistryState.retrieve` changed, it is now returning an object of type:

`{ registry: NameRegistryState, nftOwner: PublicKey | undefined }`

When `nftOwner` is **NOT** `undefined` it means that the domain name has been tokenized and **FUNDS SHOULD NOT BE SENT TO** `registry.owner`

<br />
<h2 align="center">Table of content</h2>
<br />

1. [Installation](#installation)
2. [Name Registry](#registry)
3. [Domain Name](#domains)
   - [TLD](#domain-tld)
   - [Direct look up](#domain-direct-lookup)
   - [Reverse look up](#domain-reverse-lookup)
   - [Subdomain look up](#subdomain-lookup)
   - [Find owner domain](#domain-find-for-owner)
   - [Favorite domain](#favorite-domain)
   - [Tokenization](#tokenization)
   - [Registration](#registration)
4. [Twitter](#twitter)
   - [TLD](#twitter-tld)
   - [Direct look up](#twitter-direct-lookup)
   - [Reverse look up](#twitter-reverse-lookup)

<br />
<a name="installation"></a>
<h2 align="center">Installation</h2>
<br />

To install the JS library

```js
npm i @bonfida/spl-name-service
```

or

```js
yarn add @bonfida/spl-name-service
```

<br />
<a name="registry"></a>
<h2 align="center">Name registry</h2>
<br />

The registry stores information about the domain name. It is made of two things:

- The header
- The data

The data for a domain name is always prefixed by the header, below is the structure of the header in both Rust and JS:

```rust
/// The layout of the remaining bytes in the account data are determined by the record `class`
#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, PartialEq)]
pub struct NameRecordHeader {
    // Names are hierarchical.  `parent_name` contains the account address of the parent
    // name, or `Pubkey::default()` if no parent exists.
    pub parent_name: Pubkey,

    // The owner of this name
    pub owner: Pubkey,

    // The class of data this account represents (DNS record, twitter handle, SPL Token name/symbol, etc)
    //
    // If `Pubkey::default()` the data is unspecified.
    pub class: Pubkey,
}
```

```js
export class NameRegistryState {
  parentName: PublicKey;
  owner: PublicKey;
  class: PublicKey;
  data: Buffer | undefined;

  static HEADER_LEN = 96;

  static schema: Schema = new Map([
    [
      NameRegistryState,
      {
        kind: "struct",
        fields: [
          ["parentName", [32]],
          ["owner", [32]],
          ["class", [32]],
        ],
      },
    ],
  ]);
  constructor(obj: {
    parentName: Uint8Array;
    owner: Uint8Array;
    class: Uint8Array;
  }) {
    this.parentName = new PublicKey(obj.parentName);
    this.owner = new PublicKey(obj.owner);
    this.class = new PublicKey(obj.class);
  }
```

<br />
<a name="domains"></a>
 <h2 align="center">Domain names</h2>
 <br />

To register a domain name click [here](https://naming.bonfida.org/#/auctions)

<a name="domain-tld"></a>

### TLD

Top Level Domains (TLDs) are required to resolve domain names.

The `.sol` TLD is

```js
export const SOL_TLD_AUTHORITY = new PublicKey(
  "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
);
```

The `.sol` TLD is owned by the `root` TLD

```js
export const ROOT_TLD_AUTHORITY = new PublicKey(
  "ZoAhWEqTVqHVqupYmEanDobY7dee5YKbQox9BNASZzU"
);
```

<a name="domain-direct-lookup"></a>

### Resolve a domain name

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

<a name="domain-reverse-lookup"></a>

### Reverse look up

This can be used to resolve the domain name from its public key

```js
import { performReverseLookup } from "@bonfida/spl-name-service";

// Public key of bonfida.sol
const domainKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

const domainName = await performReverseLookup(connection, domainKey); // bonfida
```

<a name="subdomain-lookup"></a>

### Subdomain look up

In order to resolve a subdomain you need to:

1. Get the parent domain key
2. Get the subdomain key
3. Retrieve the account info

```js
import {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
} from "@bonfida/spl-name-service";

// Resolution of demo.bonfida.sol

const parentDomain = "bonfida";
const subDomain = "demo";

// Step 1
const hashedParentDomain = await getHashedName(mainDomain);
const parentDomainKey = await getNameAccountKey(
  hashedParentDomain,
  undefined,
  SOL_TLD_AUTHORITY
);

// Step 2
const subDomainKey = await getDNSRecordAddress(parentDomainKey, subDomain);

// Step 3
const { registry } = await NameRegistryState.retrieve(connection, subDomainKey);
```

<a name="subdomain-reverse-lookup"></a>

### Find all subdomains

In order to resolve all subdomains of a parent domain:

```js
import { findSubdomains } from "@bonfida/spl-name-service";

// Public key of bonfida.sol
const parentKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

// Assuming that bonfida.sol has the following subdomains
// - sub_1.bonfida.sol
// - sub_2.bonfida.sol

const subdomains: string[] = await findSubdomains(connection, parentKey); // [sub_1, sub_2]
```

<a name="domain-find-for-owner"></a>

### Find all the domain names owned by a public key

You can retrieve all the domains owned by a public key using a `MemcmpFilter` filter

```js
export async function findOwnedNameAccountsForUser(
  connection: Connection,
  userAccount: PublicKey
): Promise<PublicKey[]> {
  const filters = [
    {
      memcmp: {
        offset: 32,
        bytes: userAccount.toBase58(),
      },
    },
    {
      memcmp: {
        offset: 0,
        bytes: SOL_TLD_AUTHORITY.toBase58(),
      },
    },
  ];
  const accounts = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
    filters,
  });
  return accounts.map((a) => a.pubkey);
}
```

<a name="favorite-domain"></a>

### Favorite domain

Users have the possibility to select a domain name as their favorite one. You can retrieve it with the following

```js
import { FavouriteDomain, NAME_OFFERS_ID } from "@bonfida/name-offers";
import { performReverseLookup } from "@bonfida/spl-name-service";
import { PublicKey } from "@solana/web3.js";

const findFavoriteDomainName = async (owner: PublicKey) => {
  try {
    const [favKey] = await FavouriteDomain.getKey(
      NAME_OFFERS_ID,
      new PublicKey(owner)
    );

    const favourite = await FavouriteDomain.retrieve(connection, favKey);

    const reverse = await performReverseLookup(
      connection,
      favourite.nameAccount
    );

    return reverse;
  } catch (err) {
    console.log(err);
  }
};
```

<a name="favorite-domain"></a>

### Tokenization

Domain names can be tokenized in NFTs that follow the metaplex standard.

To retrieve all the tokenized domain names

```js
import { retrieveNfts } from "@bonfida/spl-name-service";

// nfts is of type PublicKey[] and contains all the mints of the tokenized domain names
const nfts = await retrieveNfts(connection);
```

To retrieve the owner of the NFT that represent a tokenized domain name

```js
import { retrieveNftOwner } from "@bonfida/spl-name-service";

const owner = await retrieveNftOwner(connection, nameKey);
```

<a name="registration"></a>

### Registration

Unregistered domains can be registered using the following instructions:

```js
import { registerDomainName } from "@bonfida/spl-name-service";

const name = "bonfida"; // We want to register bonfida.sol
const space = 1 * 1_000; // We want a 1kB sized domain (max 10kB)

const buyer = new PublicKey("..."); // Publickey of the buyer
const buyerTokenAccount = new PublicKey("..."); // Publickey of the FIDA token account of the buyer

const [, ix] = await registerDomainName(name, space, buyer, buyerTokenAccount);

// sign and send the instruction
```

More details about direct registration can be found [here](https://docs.bonfida.org/collection/how-to-create-a-solana-domain-name/purchasing-a-domain-name/direct-registration)

<br />
<a name="twitter"></a>
<h2 align="center">Twitter handles</h2>
<br />

To register a Twitter handle click [here](https://naming.bonfida.org/#/twitter-registration)

<a name="twitter-tld"></a>

### TLD

The Twitter handle TLD is

```js
export const TWITTER_ROOT_PARENT_REGISTRY_KEY = new PublicKey(
  "4YcexoW3r78zz16J2aqmukBLRwGq6rAvWzJpkYAXqebv"
);
```

<a name="twitter-direct-lookup"></a>

### Resolve a Twitter handle

To find the Twitter handle associated to a public key

```js
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";

const pubkey = new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ");

const [handle, registryKey] = await getHandleAndRegistryKey(connection, pubkey);
```

<a name="twitter-reverse-lookup"></a>

### Reverse look up

To find the public key associated to a Twitter handle

```js
import { getTwitterRegistry } from "@bonfida/spl-name-service";

const handle = "bonfida";

const registry = await getTwitterRegistry(connection, handle);
```

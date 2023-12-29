# Devnet

Testing can be done on devnet with many of the same functions and methods previously described in this chapter, using the devnet module of the JavaScript SDK. A connection object created from a devnet RPC URL will need to be passed to these functions.

```js
import { devnet } from "@bonfida/spl-name-service";

// Use Solana devnet RPC URL or a custom RPC URL
const connection = new Connection("https://api.devnet.solana.com");
```

## Register Devnet Domains

Many of the utility and binding functions in the devnet module will require existing devnet domain names. Use the `registerDomainName` binding to register domains on devnet to be used in testing.

```js
const [, ix] = await devnet.bindings.registerDomainName(
  connection,
  "devnet-test-5", // The name of the domain you want to register
  1_000,
  publicKey, // PublicKey of fee payer
  getAssociatedTokenAddressSync(NATIVE_MINT, publicKey, true), // import from @solana/spl-token
  NATIVE_MINT
);

// Sign and send instruction
```

## Utils

The devnet module contains utility functions for lookup and derivation tasks for usage with devnet out of the box. An example of the `reverseLookup` function which looks up a human readable domain from the public key of a domain name registry, is below.

```js
// Public key of bonfida.sol
const domainKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

const domainName = await devnet.utils.reverseLookup(connection, domainKey); // bonfida
```

## Constants

A set of devnet constants are also provided for use with custom functions as well as with the bindings described below. An example of deriving the `NAME_PROGRAM_ID` is below.

```js
const programId = devnet.constants.NAME_PROGRAM_ID;
```

## Bindings

For more in depth domain name interactions like creating, updating, deleting, or transfering domains and records, bindings from the devnet module can be used. An example using the `createNameRegistry` function is below.

```js
// Domain name to transfer
const domain = "devnet-test-5";

// New owner of the domain
const newOwner = new PublicKey("...");

// The .sol TLD
const nameParent = dev.constants.ROOT_DOMAIN_ACCOUNT;

const ix = await devnet.bindings.transferNameOwnership(
  connection,
  domain,
  newOwner,
  undefined, // Optional class of the domain name, if it exists
  nameParent
);

// Sign and send instruction
```

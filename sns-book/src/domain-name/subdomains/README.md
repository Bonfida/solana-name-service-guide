# Subdomains

Subdomains in Solana Name Service (SNS) are similar to `.sol` domains but have a different parent. They can be considered as normal domains but from a different Top-Level Domain (TLD). For instance, `something.example.sol` can be considered the something subdomain of `example.sol` or a domain from the TLD `example.sol`.

## Key Characteristics of Subdomains

- **Parent Ownership:** The owner of the parent domain retains the ability to transfer subdomains without the signature from the owner of the subdomains. This is a unique feature of subdomains in SNS.

- **Limited Wallet Support:** Subdomains have limited wallet support. This means that not all wallets may support transactions involving subdomains.

- **Feature Support:** Subdomains support the same features as main domains. This includes the ability to transfer and update data.

## Creating a subdomain

This code snippet creates a subdomain and its reverse lookup account:

```js
import { createSubdomain } from "@bonfida/spl-name-service";
import { TransactionInstruction } from "@solana/web3.js";

// The subdomain to create with or without .sol e.g something.bonfida.sol or something.bonfida
const subdomain = "something.bonfida.sol";

// The owner of the parent domain
const owner = new PublicKey("...");

const instructions: TransactionInstuction[] = [];

const [, ix] = await createSubdomain(connection, subdomain, owner);

instructions.push(...ix);

// Sign and send the tx...
```

The created subdomains will initially be owned by the parent owner. A subdomain can be created and transfered inside the same transaction.

## Transferring a Subdomain

Subdomains can be transferred using the `transferSubdomain` instruction. Here is an example of how the subdomain owner can transfer a subdomain:

```js
import { transferSubdomain } from "@bonfida/spl-name-service";

// ..

// Subdomains to transfer
const subdomain = "something.bonfida.sol";

// New owner of the domain
const newOwner = new PublicKey("...");

// Whether the parent name owner is signing the transfer
const isParentSigner = false;

const ix = await transferSubdomain(
  connection,
  subdomain,
  newOwner,
  isParentSigner
);

// sign and send instruction
```

The parent name owner can trigger a transfer by setting the `isParentSigner` flag to `true` and signing the transaction.

## Resolving Subdomains

Subdomains of a `.sol` domain can be resolved using the `findSubdomains` function. Here is an example of how to resolve subdomains:

```js
import { findSubdomains } from "@bonfida/spl-name-service";

// Public key of bonfida.sol
const parentKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

// Assuming that bonfida.sol has the following subdomains
// - sub_1.bonfida.sol
// - sub_2.bonfida.sol

const subdomains: string[] = await findSubdomains(connection, parentKey); // [sub_1, sub_2]
```

## Deleting a Subdomain

Subdomains can be deleted using the `deleteInstruction` function. Here is an example of how to delete a subdomain:

```js
import { Keypair, clusterApiUrl } from "@solana/web3.js";
import {
  getDomainKey,
  NAME_PROGRAM_ID,
  deleteInstruction,
} from "@bonfida/spl-name-service";
import { signAndSendInstructions } from "@bonfida/utils";

// dex.bonfida.sol
const domain = "dex.bonfida.sol"; // With or without .sol

const wallet = Keypair.fromSecretKey(...);

const deleteSubDomain = async () => {
  const { pubkey } = await getDomainKey(domain);

  const ix = deleteInstruction(
    NAME_PROGRAM_ID,
    pubkey,
    wallet.publicKey,
    wallet.publicKey
  );

  const tx = await signAndSendInstructions(connection, [], wallet, [ix]);

  console.log(`Deleted subdomain ${tx}`);
};

deleteSubDomain();
```

> 💡 While the deletion of a subdomain is a reversible action, it's important to be mindful of potential unintended consequences.

In conclusion, subdomains in SNS are a powerful feature that allows for more granular control and organization of domain names. However, they come with their own set of considerations such as limited wallet support and different ownership rules.

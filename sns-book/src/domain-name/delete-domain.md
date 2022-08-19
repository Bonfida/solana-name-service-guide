# Deleting a domain

> 🚨 **Deleting a domain is irreversible**

> 🚨 **Deleting a domain will make you loose ownership of the subdomains and records related to the domain**

> 🚨 **Deleting domain names is not recommended**

Domain names can be deleted using the `deleteInstruction`, below is a NodeJS example:

```js
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import {
  getDomainKey,
  NAME_PROGRAM_ID,
  deleteInstruction,
} from "@bonfida/spl-name-service";
import { signAndSendInstructions } from "@bonfida/utils";

// bonfida.sol
const domain = "bonfida.sol"; // With or without .sol

const connection = new Connection(clusterApiUrl("mainnet-beta"), "processed");

const wallet = Keypair.fromSecretKey(...);

const deleteDomain = async () => {
  const { pubkey } = await getDomainKey(domain);

  const ix = deleteInstruction(
    NAME_PROGRAM_ID,
    pubkey,
    wallet.publicKey,
    wallet.publicKey
  );

  const tx = await signAndSendInstructions(connection, [], wallet, [ix]);

  console.log(`Deleted domain ${tx}`);
};

deleteDomain();
```

## Deleting subdomains

Subdomains can be deleted using the `deleteInstruction`, below is a NodeJS example:

```js
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import {
  getDomainKey,
  NAME_PROGRAM_ID,
  deleteInstruction,
} from "@bonfida/spl-name-service";
import { signAndSendInstructions } from "@bonfida/utils";

// dex.bonfida.sol
const domain = "dex.bonfida.sol"; // With or without .sol

const connection = new Connection(clusterApiUrl("mainnet-beta"), "processed");

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

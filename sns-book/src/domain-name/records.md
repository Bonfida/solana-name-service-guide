# Records

In addition to typical DNS records (A, AAAA, TXT, MX, etc.), the Solana Name Service introduces brand new web3-specific types. The following table will be updated as new protocols are integrated.

| Name     | Value                                           |
| -------- | ----------------------------------------------- |
| IPFS     | An IPFS CID                                     |
| ARWV     | An Arweave address                              |
| SOL      | A concatenation of a public key and a signature |
| ETH      | An ETH public key                               |
| BTC      | A BTC public key                                |
| LTC      | An LTC public key                               |
| DOGE     | A DOGE public key                               |
| email    | An email address                                |
| url      | A website URL                                   |
| discord  | A discord username                              |
| github   | A github username                               |
| reddit   | A reddit username                               |
| twitter  | A twitter username                              |
| telegram | A telegram username                             |
| pic      | A profile picture                               |

## Record enum

The following `enum` is exported from `@bonfida/spl-name-service`

```js
export enum Record {
  IPFS = "IPFS",
  ARWV = "ARWV",
  SOL = "SOL",
  ETH = "ETH",
  BTC = "BTC",
  LTC = "LTC",
  DOGE = "DOGE",
  Email = "email",
  Url = "url",
  Discord = "discord",
  Github = "github",
  Reddit = "reddit",
  Twitter = "twitter",
  Telegram = "telegram",
  Pic = "pic"
}
```

## Record derivation

Record keys can be derived with the `getDomainKey` function and the `record` flag set to `true`

```js
const record = Record.IPFS + "." + "bonfida"; // With or without the .sol at the end
const { pubkey: recordKey } = await getDomainKey(record, true);
```

> If the `record` flag is set to `false`, the `getDomainKey` function will derive the key of the subdomain

## Resolving records

The following resolving functions are exported:

- `getIpfsRecord`: This function can be used to retrieve the IPFS record of a domain name
- `getArweaveRecord`: This function can be used to retrieve the Arweave record of a domain name
- `getSolRecord`: This function can be used to retrieve the SOL record of a domain name
- `getEthRecord`: This function can be used to retrieve the ETH record of a domain name
- `getBtcRecord`: This function can be used to retrieve the BTC record of a domain name
- `getLtcRecord`: This function can be used to retrieve the LTC record of a domain name
- `getDogeRecord`: This function can be used to retrieve the DOGE record of a domain name
- `getEmailRecord`: This function can be used to retrieve the email record of a domain name
- `getUrlRecord`: This function can be used to retrieve the URL record of a domain name
- `getDiscordRecord`: This function can be used to retrieve the Discord record of a domain name
- `getGithubRecord`: This function can be used to retrieve the Github record of a domain name
- `getRedditRecord`: This function can be used to retrieve the Reddit record of a domain name
- `getTwitterRecord`: This function can be used to retrieve the Twitter record of a domain name
- `getTelegramRecord`: This function can be used to retrieve the Telegram record of a domain name
- `getShdwRecord`: This function can be used to retrieve the SHDW record of a domain name

All functions have the following signature

```js
(connection: Connection, domain: string) => Promise<NameRegistryState>
```

A more generic resolving function `getRecord` is also exported with the following signature

```js
(connection: Connection, domain: string, record: Record) => Promise<NameRegistryState>
```

## The SOL record

The SOL record can be used to receive funds to a different address than the one owning the domain. This allows people to hold the domain on a cold wallet while being able to receive funds on a hot wallet.

The SOL record data contains a 96-byte array that is the concatenation of a public key (32 bytes) and signature (64 bytes). The first 32 bytes represent the public key (`pubkey`) to which funds should be sent and the next 64 bytes are the signature of `pubkey_as_bytes + record_key_as_bytes` by the owner of the domain. If the signature is invalid funds **must not** be transferred.

The signature is required to prevent funds being sent to a stale SOL record after a domain has been transferred or sold.

## Gateway

The following records can be resolved in browser using [https://sol-domain.org](https://sol-domain.org):

- `Url`
- `IPFS`
- `ARWV`
- `SHDW`

The implementation of this resolver can be found [on Github](https://github.com/Bonfida/name-resolver)

> For example [https://bonfida.sol-domain.org](https://bonfida.sol-domain.org)

## Difference between records and subdomains

In practice, let us consider the name `foo.sol` . If we want to find the domain's A record, containing an associated IPv4 address, then we can find it by querying `\1A.foo.sol`, with \1 the character of code value 1. The specification makes use of this prefix in order to differentiate between actual domains and records, which means that it is still possible to use the `A.foo.sol` subdomain with no collision.
In addition to this, the special `\1.foo.sol` is reserved to hold the list of all currently initialized records for a given subdomain

> **Note:** `\0` and `\1` are convenient notations for:
>
> - `\0 = \x00`.
> - `\1 = \x01`.

## Editing records

Below is a NodeJS example of how to create and edit a record

```js
import {
  Connection,
  TransactionInstruction,
  Keypair,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  Record,
  getDomainKey,
  createNameRegistry,
  NameRegistryState,
  updateInstruction,
  NAME_PROGRAM_ID,
  Numberu32,
} from "@bonfida/spl-name-service";
import { signAndSendInstructions } from "@bonfida/utils";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "processed");
const wallet = Keypair.fromSecretKey(...);

// bonfida.sol
const domain = "bonfida"; // With or without the .sol at the end

// The IPFS record of bonfida.sol
const record = Record.IPFS;

const update = async () => {
  const ixs: TransactionInstruction[] = [];
  const { pubkey: domainKey } = await getDomainKey(domain);
  const { pubkey: recordKey } = await getDomainKey(record + "." + domain, true);

  const recordAccInfo = await connection.getAccountInfo(recordKey);

  if (!recordAccInfo?.data) {
    // The record does not exist so create it first
    const space = 2_000;
    const lamports = await connection.getMinimumBalanceForRentExemption(
      space + NameRegistryState.HEADER_LEN
    );
    const ix = await createNameRegistry(
      connection,
      Buffer.from([1]).toString() + record,
      space,
      wallet.publicKey,
      wallet.publicKey,
      lamports,
      undefined,
      domainKey
    );
    ixs.push(ix);
  }

  const ix = updateInstruction(
    NAME_PROGRAM_ID,
    recordKey,
    new Numberu32(0),
    Buffer.from("Some IPFS CID"),
    wallet.publicKey
  );

  ixs.push(ix);

  const tx = await signAndSendInstructions(connection, [], wallet, ixs);
  console.log(`Updated record ${tx}`);
};

update();
```

## Deleting a record

Records can be deleted using the `deleteInstruction` function, below is a NodeJS example

```js
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import {
  Record,
  getDomainKey,
  NAME_PROGRAM_ID,
  deleteInstruction,
} from "@bonfida/spl-name-service";
import { signAndSendInstructions } from "@bonfida/utils";

const domain = "bonfida.sol"; // With or without .sol

const record = Record.IPFS;

const connection = new Connection(clusterApiUrl("mainnet-beta"), "processed");

const wallet = Keypair.fromSecretKey(...) // Your wallet owning the domain

const deleteRecord = async () => {
  const { pubkey: recordKey } = await getDomainKey(record + "." + domain, true);

  const ix = deleteInstruction(
    NAME_PROGRAM_ID,
    recordKey,
    wallet.publicKey,
    wallet.publicKey
  );

  const tx = await signAndSendInstructions(connection, [], wallet, [ix]);

  console.log(`Deleted record ${tx}`);
};

deleteRecord();
```

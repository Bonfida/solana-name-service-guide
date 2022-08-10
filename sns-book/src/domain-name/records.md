# Records

In addition to typical DNS records (A, AAAA, TXT, MX, etc.), the Solana Name Service introduces brand new web3-specific types. The following table will be updated as new protocols are integrated.

| Name     | Value                              |
| -------- | ---------------------------------- |
| IPFS     | An IPFS CID                        |
| ARWV     | An Arweave address                 |
| SOL      | A concatenation of two public keys |
| ETH      | An ETH public key                  |
| BTC      | A BTC public key                   |
| LTC      | An LTC public key                  |
| DOGE     | A DOGE public key                  |
| email    | An email address                   |
| url      | A website URL                      |
| discord  | A discord username                 |
| github   | A github username                  |
| reddit   | A reddit username                  |
| twitter  | A twitter username                 |
| telegram | A telegram username                |
| pic      | A profile picture                  |

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
-

All functions have the following signature

```js
(connection: Connection, domain: string) => Promise<NameRegistryState>
```

A more generic resolving function `getRecord` is also exported with the following signature

```js
(connection: Connection, domain: string, record: Record) => Promise<NameRegistryState>
```

## The SOL record

The SOL record can be used to receive funds to a different address than the one owning the domain. This allows people to hold the domain on a cold wallet while still being able to receive funds on a hot wallet.

The SOL record data contains a 96-byte array that is the concatenation of a public key (32 bytes) and signature (64 bytes). The first 32 bytes represent the public key (`pubkey`) to which funds should be sent and the next 64 bytes are the signature of `pubkey_as_bytes + record_key_as_bytes` signed by the owner of the domain. If the signature is invalid funds **must not** be transfered.

The signature is required to prevent funds being sent to a stale SOL record after a domain was transfered or sold to a new owner.

## Gateway

The following records can be resolved in browser using [https://sol-domain.org](https://sol-domain.org):

- `Url`
- `IPFS`
- `ARWV`

The implementation of this resolver can be found [on Github](https://github.com/Bonfida/name-resolver)

> For example [https://bonfida.sol-domain.org](https://bonfida.sol-domain.org)

## Difference between records and subdomains

In practice, let us consider the name `foo.sol` . If we want to find the domain's A record, containing an associated IPv4 address, then we can find it by querying `\1A.foo.sol`, with \1 the character of code value 1. The specification makes use of this prefix in order to differentiate between actual domains and records, which means that it is still possible to use the `A.foo.sol` subdomain with no collision.
In addition to this, the special `\1.foo.sol` is reserved to hold the list of all currently initialized records for a given subdomain

> **Note:** `\0` and `\1` are convenient notations for:
>
> - `\0 = \x00`.
> - `\1 = \x01`.

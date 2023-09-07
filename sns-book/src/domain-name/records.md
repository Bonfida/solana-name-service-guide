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
| SHDW     | A Shadow drive address                          |
| POINT    | A Point network record                          |
| BSC      | A BSC public key                                |
| INJ      | A Cosmos (Injective) public key                 |
| backpack | A Backpack username                             |

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
  Pic = "pic",
  SHDW = "SHDW",
  POINT = "POINT",
  BSC = "BSC",
  Injective = "INJ",
  Backpack = "backpack",
}
```

## Gateway

The following records can be resolved in browser using [https://sol-domain.org](https://sol-domain.org):

- `Url`
- `IPFS`
- `ARWV`
- `SHDW`

The implementation of this resolver can be found [on Github](https://github.com/Bonfida/name-resolver)

> For example [https://bonfida.sol-domain.org](https://bonfida.sol-domain.org)

## Records V1 & V2

There are notable differences between Records V1 and V2. Records V1 use a derivation prefix of `0x01` and encode their content based on the [SNS-IP-1 guidelines](https://github.com/Bonfida/sns-ip/blob/master/proposals/sns-ip-1.md). In response to challenges related to data authenticity and staleness issues prevalent in V1, Records V2 was introduced. V2 employs a class in the derivation and a distinct encoding schema detailed in [SNS-IP-3](https://github.com/Bonfida/sns-ip/blob/master/proposals/sns-ip-3.md). Records V2 incorporates a validation ID system to ensure data integrity and freshness. Importantly, due to the distinct derivation, Records V1 and V2 can co-exist without collisions. However, the goal of the ecosystem is a complete migration to Records V2.

## Difference between records and subdomains

In practice, let us consider the name `foo.sol` . If we want to find the domain's A record, containing an associated IPv4 address, then we can find it by querying `\1A.foo.sol`, with \1 the character of code value 1. The specification makes use of this prefix in order to differentiate between actual domains and records, which means that it is still possible to use the `A.foo.sol` subdomain with no collision.

> **Note:** `\0` and `\1` are convenient notations for:
>
> - `\0 = \x00`.
> - `\1 = \x01`.

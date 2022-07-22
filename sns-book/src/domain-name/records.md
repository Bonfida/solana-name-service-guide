# Records

In addition to typical DNS records (A, AAAA, TXT, MX, etc.), the Solana Name Service introduces brand new web3-specific types. The following table will be updated as new protocols are integrated.

| Name     | Value               |
| -------- | ------------------- |
| IPFS     | An IPFS CID         |
| ARWV     | An Arweave address  |
| ETH      | An ETH public key   |
| BTC      | A BTC public key    |
| LTC      | An LTC public key   |
| DOGE     | A DOGE public key   |
| email    | An email address    |
| url      | A website URL       |
| discord  | A discord username  |
| github   | A github username   |
| reddit   | A reddit username   |
| twitter  | A twitter username  |
| telegram | A telegram username |
| pic      | A profile picture   |

## Record enum

The following `enum` is exported from `@bonfida/spl-name-service`

```js
export enum Record {
  IPFS = "IPFS",
  ARWV = "ARWV",
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

All functions have the following signature

```js
(connection: Connection, domain: string) => Promise<NameRegistryState>
```

A more generic resolving function `getRecord` is also exported with the following signature

```js
(connection: Connection, domain: string, record: Record) => Promise<NameRegistryState>
```

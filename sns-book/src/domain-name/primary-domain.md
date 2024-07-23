# Primary domain

> 💡 Primary domains used to be called favorite domains. The change was made in version 3.0.0 of the SDK

Users have the possibility to select a domain name as their primary one. If you are a developer and want to integrate SNS to your DApp it's recommended to always use the primary domain name to replace the user's public key.

## Get Multiple Primary Domains

To retrieve primary domains for a group of up to 100 users, we've created the `getMultiplePrimaryDomains` function in our JavaScript SDK. This function is optimized for network efficiency, making only four RPC calls, three of which are executed in parallel. The function returns a promise that resolves to an array of strings or undefined representing the primary domain, or lack thereof for each wallet passed to the function.

```js
import { getMultiplePrimaryDomains } from "@bonfida/spl-name-service";

const wallets = [
  new PublicKey("3ogYncmMM5CmytsGCqKHydmXmKUZ6sGWvizkzqwT7zb1"),
  new PublicKey("FMmaHPDL47V1gXsfh9WjgAT7Er3dfDvarQubTU1Jxc1r"),
  // Public Keys of all the wallet addresses you're looking up a primary domain for (up to 100)
];

const primaryDomains = await getMultiplePrimaryDomains(connection, wallets);
```

## Get Single Primary Domain

The primary domain name of a single user can be retrieved with the code below.

```js
import { getPrimaryDomain } from "@bonfida/spl-name-service";

// ...

const { domain, reverse } = await getPrimaryDomain(connection, user);
```

`getPrimaryDomain` returns the following:

- `domain`: The public key of the primary domain name
- `reverse`: The reverse look up of the account

For instance for [FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ](https://sns.id/profile/FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ):

- `domain = Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb`
- `reverse = bonfida`

## Get All Primary Domains

To get all primary domains currently existence, you can use the SNS API endpoint below.

```
GET /v2/domains/all-primary
```

This endpoint returns all primary domains that have been registered.

### Request

No parameters are required for this request.

### Response

The response is a JSON object where each key is a wallet public key and the value is an object containing the following properties:

- domain: The primary domain name associated with the public key.
- owner: The public key of the owner of the domain.
- domain_key: The key associated with the domain.

Example response:

```
{
  "5J9BeWAZGekH71Huiro2qW6AJXSeBj7zPsHniKkmjToY": {
    "domain": "hansolana",
    "owner": "5J9BeWAZGekH71Huiro2qW6AJXSeBj7zPsHniKkmjToY",
    "domain_key": "7mNYJ8UL8YV7dpPjCREXgUaoyyULmmZxxo1raT4w9kKS"
  }
}
```

### Caching

This endpoint is cached and may lag behind the blockchain by a few minutes. For mission-critical resolution, it is recommended not to use this endpoint and instead use the blockchain directly. However, for simple UI applications, this endpoint is perfectly suitable.

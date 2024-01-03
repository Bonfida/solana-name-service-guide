# Favorite domain

Users have the possibility to select a domain name as their favorite one. If you are a developer and want to integrate SNS to your DApp it's recommended to always use the favorite domain name to replace the user's public key.

The favorite domain name can be retrieved with the following code

```js
import { getFavoriteDomain } from "@bonfida/spl-name-service";

// ...

const { domain, reverse } = await getFavoriteDomain(connection, user);
```

`getFavoriteDomain` returns the following:

- `domain`: The public key of the domain name
- `reverse`: The reverse look up of the account

For instance for [FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ](https://sns.id/profile/FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ):

- `domain = Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb`
- `reverse = bonfida`

## Getting all favorite domains

```
GET /v2/domains/all-favorites
```

This endpoint returns all favorite domains that have been registered.

### Request

No parameters are required for this request.

### Response

The response is a JSON object where each key is a wallet public key and the value is an object containing the following properties:

- domain: The favorite domain name associated with the public key.
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

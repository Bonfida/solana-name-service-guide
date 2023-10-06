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

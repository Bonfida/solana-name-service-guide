# Resolving Twitter handles

The Solana name service supports the registration of Twitter handles, allowing users to connect their Twitter profile to their wallet.

## Direct look up

To find the Twitter handle associated to a public key

```js
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";

const pubkey = new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ");

const [handle] = await getHandleAndRegistryKey(connection, pubkey);
```

## Reverse look up

To find the public key associated to a Twitter handle

```js
import { getTwitterRegistry } from "@bonfida/spl-name-service";

const handle = "bonfida";

const registry = await getTwitterRegistry(connection, handle);
const owner = registry.owner.toBase58();
```

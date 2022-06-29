# Direct look up

To find the Twitter handle associated to a public key

```js
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";

const pubkey = new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ");

const [handle, registryKey] = await getHandleAndRegistryKey(connection, pubkey);
```

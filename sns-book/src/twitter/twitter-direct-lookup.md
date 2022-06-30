# Direct look up

![direct-reverse](../assets/twitter-direct-reverse.png)

To find the Twitter handle associated to a public key

```js
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";

const pubkey = new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ");

const [handle] = await getHandleAndRegistryKey(connection, pubkey);
```

# Reverse look up

![direct-reverse](../assets/twitter-direct-reverse.png)

To find the public key associated to a Twitter handle

```js
import { getTwitterRegistry } from "@bonfida/spl-name-service";

const handle = "bonfida";

const registry = await getTwitterRegistry(connection, handle);
const owner = registry.owner.toBase58();
```

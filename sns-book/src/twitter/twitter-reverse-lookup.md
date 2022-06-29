# Reverse look up

To find the public key associated to a Twitter handle

```js
import { getTwitterRegistry } from "@bonfida/spl-name-service";

const handle = "bonfida";

const registry = await getTwitterRegistry(connection, handle);
```

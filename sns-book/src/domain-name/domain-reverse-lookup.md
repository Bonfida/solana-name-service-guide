# Reverse look up

This can be used to resolve the domain name from its public key

```js
import { performReverseLookup } from "@bonfida/spl-name-service";

// Public key of bonfida.sol
const domainKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

const domainName = await performReverseLookup(connection, domainKey); // bonfida
```

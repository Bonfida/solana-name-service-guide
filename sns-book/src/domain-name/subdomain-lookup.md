# Subdomain look up

In order to resolve all subdomains of a parent domain:

```js
import { findSubdomains } from "@bonfida/spl-name-service";

// Public key of bonfida.sol
const parentKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

// Assuming that bonfida.sol has the following subdomains
// - sub_1.bonfida.sol
// - sub_2.bonfida.sol

const subdomains: string[] = await findSubdomains(connection, parentKey); // [sub_1, sub_2]
```

# Tokenization

Domain names can be tokenized in NFTs that follow the metaplex standard.

To retrieve all the tokenized domain names

```js
import { retrieveNfts } from "@bonfida/spl-name-service";

// nfts is of type PublicKey[] and contains all the mints of the tokenized domain names
const nfts = await retrieveNfts(connection);
```

To retrieve the owner of the NFT that represent a tokenized domain name

```js
import { retrieveNftOwner } from "@bonfida/spl-name-service";

const owner = await retrieveNftOwner(connection, nameKey);
```

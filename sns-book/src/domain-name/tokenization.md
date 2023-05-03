# Tokenization

Domain names are **not** SPL tokens, however, they can be tokenized in NFTs that follow the Metaplex standard. It's only recommended to tokenize your domain if you want to resell your domain on an NFT market place like [Magic Eden](https://magiceden.io/marketplace/bonfida) or [Hyperspace](https://hyperspace.xyz/collection/solananameservice).

The smart contract handling the tokenization of domain names can be found here: [Name tokenizer](https://github.com/Bonfida/name-tokenizer)

## JS example

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

# Tokenization

Domain names are **not** SPL tokens, however, they can be tokenized in NFTs that follow the Metaplex standard. It's only recommended to tokenize your domain if you want to resell your domain on an NFT market place like [Magic Eden](https://magiceden.io/marketplace/bonfida), [Tensor](https://www.tensor.trade/trade/sol_domain_names), or [SolSniper](https://www.sniper.xyz/collection/bonfida).

The smart contract handling the tokenization of domain names can be found here: [Name tokenizer](https://github.com/Bonfida/name-tokenizer)

## JS example

To retrieve all currently tokenized domain names use the retrieveNfts function. This function returns an array of currently tokenized domains as public keys, and contains all the mints of the tokenized domain name.

```js
import { retrieveNfts } from "@bonfida/spl-name-service";

const nfts = await retrieveNfts(connection);
```

To retrieve all of the tokenized domain names of a specific owner use getTokenizedDomains. Function returns an array of public keys, their reverses, and mints.

```js
import { getTokenizedDomains } from "@bonfida/spl-name-service";

const tokenizedDomains = await getTokenizedDomains(connection, owner);
```

To retrieve the public key of the owner of a specific NFT that represents a tokenized domain name, use the retrieveNftOwner function.

```js
import { retrieveNftOwner } from "@bonfida/spl-name-service";

const owner = await retrieveNftOwner(connection, nameKey);
```

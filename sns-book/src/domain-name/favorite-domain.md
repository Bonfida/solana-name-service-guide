# Favorite domain

Users have the possibility to select a domain name as their favorite one. You can retrieve it with the following

```js
import { FavouriteDomain, NAME_OFFERS_ID } from "@bonfida/name-offers";
import { performReverseLookup } from "@bonfida/spl-name-service";
import { PublicKey } from "@solana/web3.js";

const findFavoriteDomainName = async (owner: PublicKey) => {
  try {
    const [favKey] = await FavouriteDomain.getKey(
      NAME_OFFERS_ID,
      new PublicKey(owner)
    );

    const favourite = await FavouriteDomain.retrieve(connection, favKey);

    const reverse = await performReverseLookup(
      connection,
      favourite.nameAccount
    );

    return reverse;
  } catch (err) {
    console.log(err);
  }
};
```

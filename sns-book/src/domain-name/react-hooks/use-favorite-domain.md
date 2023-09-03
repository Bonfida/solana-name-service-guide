# useFavoriteDomain

Favorite domains allow users who own several domains to select one of them as their default identity.

**This favorite domain should be used by default by dApps.**

```ts
import { useEffect, useRef, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { reverseLookup } from "@bonfida/spl-name-service";
import { FavouriteDomain, NAME_OFFERS_ID } from "@bonfida/name-offers";

type Result = string | undefined;

export const useFavoriteDomain = (user: PublicKey) => {
  const { connection } = useConnection();
  const [result, setResult] = useState<Result>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      const [favKey] = await FavouriteDomain.getKey(NAME_OFFERS_ID, user);
      const favourite = await FavouriteDomain.retrieve(connection, favKey);

      const reverse = await reverseLookup(connection, favourite.nameAccount);

      if (mounted.current) {
        setResult(reverse);
      }

      return () => (mounted.current = false);
    };

    fn().catch(console.error);
  }, [user.toBase58()]);

  return result;
};
```

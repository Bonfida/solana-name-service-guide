# useProfilePic

Users can set a profile picture using the `pic` record of their favorite domain name. This record holds the URI to their profile picture.

```ts
import { useEffect, useRef, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";

export const useProfilePic = (user: PublicKey) => {
  const { connection } = useConnection();
  const favorite = useFavoriteDomain(user);
  const [result, setResult] = useState<Result>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      if (!favorite) {
        return setResult(undefined);
      }

      const registry = await getPicRecord(connection, favorite.toBase58());

      if (!registry.data) {
        return setResult(undefined);
      }

      if (mounted.current) {
        setResult(registry.data.toString("utf-8"));
      }

      return () => (mounted.current = false);
    };

    fn().catch(console.error);
  }, [user.toBase58(), favorite]);

  return result;
};
```

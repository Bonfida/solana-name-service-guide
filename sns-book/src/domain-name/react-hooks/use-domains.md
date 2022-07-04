# useDomains

This hook can be used to resolve several domain names:

```ts
import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";
import { useEffect, useState, useRef } from "react";

type Result = (NameRegistryState | undefined)[] | undefined;

/**
 * This hook can be used to resolve several domain names
 * @param domains List of domains to resolve e.g ["bonfida", "serum"]
 * @returns
 */
export const useDomains = (domains: string[]) => {
  const { connection } = useConnection();
  const [result, setResult] = useState<Result>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      const keys = await Promise.all(domains.map((e) => getDomainKey(e)));

      const registries = await NameRegistryState.retrieveBatch(
        connection,
        keys.map((e) => e.pubkey)
      );

      if (mounted.current) {
        setResult(registries);
      }

      return () => (mounted.current = false);
    };

    fn().catch(console.error);
  }, [...domains]);

  return result;
};
```

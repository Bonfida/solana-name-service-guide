# React hooks

Below is a list of simple React hooks.

**For production it's recommended to use [React Query](https://react-query.tanstack.com/) or [ahooks](https://ahooks.js.org/)**

## useDomains

Resolve registries for a list of domain names:

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

## useDomainRecords

Resolve all the records of a domain name

```ts
type Result = (string | undefined)[] | undefined;

/**
 *
 * @param domains Domains to resolve records for e.g "bonfida"
 * @returns
 */
export const useRecords = (domain: string) => {
  const { connection } = useConnection();
  const [result, setResult] = useState<Result>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      const recordsKeys = Object.keys(Record).map((e) => Record[e]);

      const keys = await Promise.all(
        recordsKeys.map((e) => getDomainKey(e + "." + domain))
      );

      const registries = await NameRegistryState.retrieveBatch(
        connection,
        keys.map((e) => e.pubkey)
      );

      // Remove trailling 0s
      const records = registries.map((e) => {
        if (e?.data) {
          const idx = e.data?.indexOf(0x00);
          e.data = e.data?.slice(0, idx);

          return e.data.toString();
        }
        // Record is not defined
        return undefined;
      });

      if (mounted.current) {
        setResult(records);
      }

      return () => (mounted.current = false);
    };

    fn().catch(console.error);
  }, [domain]);

  return result;
};
```

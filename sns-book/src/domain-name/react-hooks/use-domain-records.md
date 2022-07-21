# useDomainRecords

This hook can be used to retrieve all the records of a domain:

```ts
type Result = (string | undefined)[] | undefined;

/**
 * This hook can be used to retrieve all the records of a domain
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
        recordsKeys.map((e) => getDomainKey(e + "." + domain, true))
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

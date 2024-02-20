# useRecordsV2

This hook returns the serialized or deserialized V2 records of the given domain name.

```ts
type Result = (string | undefined)[] | undefined;

/**
 * Returns the deserialized (or not) records V2 of the given domain name
 * @param connection The Solana RPC connection object
 * @param domain The domain name
 * @param records The list of records to fetch
 * @param deserialize Whether to deserialize the record content or not. Deserialization is done according to SNS IP-1
 * @returns Returns a list of records' content
 */

export const useRecordsV2 = (
  connection: Connection,
  domain: string,
  records: Record[],
  deserialize?: boolean
) => {
  return useAsync(async () => {
    // useAsync from the react-async-hook library
    const res = await getMultipleRecordsV2(connection, domain, records, {
      deserialize,
    });
    return res;
  }, [domain, ...records]);
};
```

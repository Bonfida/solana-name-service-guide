# `sns_getDomainRecordKey`

Returns a domain record's Solana account public key. Supported record identifier include `SOL`, `ETH` and `IPFS`. The `get_supported_records` method returns a list of all supported records.

## Parameters

- **domain** `string` *required*: The domain name to query for.
- **record** `string` *required*: The record identifier to query for.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: A base58-encoded Solana public key.

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_getDomainRecordKey",
  "params": [
    "bonfida.sol",
    "github"
  ],
  "id": 42
}
```

```json
{
  "jsonrpc": "2.0",
  "result": "4sQDE98ZzQ23Rygb7tx1HhXQiuxswKhSBvECCREW35Ei",
  "id": 42
}
```

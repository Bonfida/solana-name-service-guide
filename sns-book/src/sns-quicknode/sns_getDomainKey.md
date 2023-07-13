# `sns_getDomainKey`

Returns a domain's Solana account public key.

## Parameters

- **domain** `string` *required*: The domain name to query for.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: A base58-encoded Solana public key.

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_getDomainKey",
  "params": [
    "bonfida.sol"
  ],
  "id": 42
}
```

```json
{
  "jsonrpc": "2.0",
  "result": "Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb",
  "id": 42
}
```

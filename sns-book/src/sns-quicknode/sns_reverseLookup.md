# `sns_reverse_lookup`

Returns the domain name associated with a raw SNS account.

## Parameters

- **domain_key** `string` *required*: The base58-encoded public key of the Solana account to reverse lookup.

## Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: The domain name.

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_reverseLookup",
  "params": [
    "Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb"
  ],
  "id": 42
}
```

```json
{
  "jsonrpc": "2.0",
  "result": "bonfida",
  "id": 42
}
```

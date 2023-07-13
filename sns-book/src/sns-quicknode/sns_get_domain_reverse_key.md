# `sns_get_domain_reverse_key`

Returns a domain's reverse registry Solana account public key.

## Parameters

- **domain** `string` *required*: The domain name to query for.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: A base58-encoded Solana public key.

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_getDomainReverseKey",
  "params": [
    "bonfida.sol"
  ],
  "id": 42
}```

```json
{
  "jsonrpc": "2.0",
  "result": "DqgmWxe2PPrfy45Ja3UPyFGwcbRzkRuwXt3NyxjX8krg",
  "id": 42
}```

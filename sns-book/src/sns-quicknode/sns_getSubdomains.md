# `sns_getSubdomains`

Returns a list of currently registered subdomains for a given domain.

## Parameters

- **domain** `string` *required*: The domain name.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string[]`: The list of currently registered subdomain name account keys, encoded as base58.

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_getSubdomains",
  "params": [
    "bonfida.sol"
  ],
  "id": 42
}
```

```json
{
  "jsonrpc": "2.0",
  "result": [
    "naming",
    "dex",
    "test"
  ],
  "id": 42
}
```

# `sns_resolve_domain`

Returns the resolved Solana Public key associated to a domain.

## Parameters

- **domain** `string` *required*: The domain name to resolve.

## Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: The base-58 encoded Solana Public Key the domain resolves to.

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_resolveDomain",
  "params": [
    "bonfida.sol"
  ],
  "id": 42
}```

```json
{
  "jsonrpc": "2.0",
  "result": "HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA",
  "id": 42
}```

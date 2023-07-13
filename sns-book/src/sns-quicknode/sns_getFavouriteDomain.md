# `sns_getFavouriteDomain`

Returns a user wallet's favourite (i.e. primary) domain.

## Parameters

- **owner** `string` *required*: The base58-encoded Solana public key of the wallet to query for.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `Domain`: A `Domain` object describig the requested domain name.

The `Domain` Object contains two fields :

- **name** `string`: The domain name
- **key** `string`: The domain's base-58 encoded public key

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_getFavouriteDomain",
  "params": [
    "HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA"
  ],
  "id": 42
}
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "key": "Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb",
    "name": "bonfida"
  },
  "id": 42
}
```

# `sns_get_all_domains_for_owner`

Returns the list of SNS domains currently owned by a given account.

## Parameters

- **owner** `string` *required*: A base58-encoded Solana Pubkey.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `Domain[]`: A list of `Domain` objects

The `Domain` Object contains two fields :

- **name** `string`: The domain name
- **key** `string`: The domain's base-58 encoded public key

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_getAllDomainsForOwner",
  "params": [
    "HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA"
  ],
  "id": 42
}
```

```json
{
  "jsonrpc": "2.0",
  "result": [
    {
      "key": "Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb",
      "name": "bonfida"
    },
    {
      "key": "8xMJaFHqas1gzS7xLuWh298TDuBUw4hqLXL2ZFs376hH",
      "name": "springboks"
    },
    {
      "key": "BAW7NsKcY8SLr98ZNYcH2HeDvPBPE2EoyjuPKcJ9bW1d",
      "name": "9772"
    },
    {
      "key": "9B8y69VYEvLuwnaPdqNWL2wrV2XCLKrNAewC3FQEXptn",
      "name": "👨‍🌾"
    }
  ],
  "id": 42
}
```

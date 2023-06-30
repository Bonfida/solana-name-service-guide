# `get_domain_record_key`

Returns a domain record's Solana account public key. Supported record identifier include `SOL`, `ETH` and `IPFS`. The `get_supported_records` method returns a list of all supported records.

## Parameters

- **domain** `string` *required*: The domain name to query for.
- **record** `string` *required*: The record identifier to query for.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: A base58-encoded Solana public key.

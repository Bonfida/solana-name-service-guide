# `get_domain_record_key`

Returns a domain's Solana account public key.

## Parameters

- **domain** `string` *required*: The domain name to query for.
- **record** `string` *required*: The record identifier to query for.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: A base58-encoded Solana public key.

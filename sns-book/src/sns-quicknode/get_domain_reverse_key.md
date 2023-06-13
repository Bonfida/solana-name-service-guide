# `get_domain_reverse_key`

Returns a domain's reverse registry Solana account public key.

## Parameters

- **domain** `string` *required*: The domain name to query for.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: A base58-encoded Solana public key.

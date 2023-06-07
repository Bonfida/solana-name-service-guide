# `get_favourite_domain`

Returns a user wallet's favourite (i.e. primary) domain.

## Parameters

- **owner** `string` *required*: The base58-encoded Solana public key of the wallet to query for.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: The domain name.

# `resolve_domain`

Returns the resolved Solana Public key associated to a domain.

## Parameters

- **domain** `string` *required*: The domain name to resolve.

## Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: The base-58 encoded Solana Public Key the domain resolves to.

# `get_subdomains`

Returns a list of currently registered subdomains for a given domain.

## Parameters

- **domain** `string` *required*: The domain name.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string[]`: The list of currently registered subdomain names.

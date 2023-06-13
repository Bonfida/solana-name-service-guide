# `get_domain_data`

Returns base64 encoded contents of the domain's data payload, or those of an associated record.

## Parameters

- **domain** `string` *required*: The domain name to query.
- **record** `string` *optional*: The associated record to get the data from instead.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: A base64 encoding of the record or domain's data payload.

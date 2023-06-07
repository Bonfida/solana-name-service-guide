# `get_all_domains_for_owner`

Returns the list of SNS domains currently owned by a given account.

## Parameters

- **owner** `string` *required*: A base58-encoded Solana Pubkey.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string[]`: A list of owned domain names

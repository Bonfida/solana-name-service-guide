# `get_all_domains_for_owner`

Returns the list of SNS domains currently owned by a given account.

## Parameters

- **owner** `string` *required*: A base58-encoded Solana Pubkey.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `Domain[]`: A list of `Domain` objects

The `Domain` Object contains two fields :

- **name** `string`: The domain name
- **key** `string`: The domain's base-58 encoded public key

# SNS Quicknode API

The Solana Name Service Quicknode marketplace plugin accepts requests using the [JSON-RPC-2.0](https://www.jsonrpc.org/specification) specification over `HTTP POST`.

This means that it accepts `HTTP POST` requests with the `Content-Type` header set to `application/json`, containing a json payload. For example:

```json
{
    "jsonrpc": "2.0",
    "method": "get_domain_key",
    "params": {
        "domain": "bonfida.sol"
    },
    "id": 5678
}
```

The response is a JSON object. For example:

```json
{
    "jsonrpc": "2.0",
    "result": "HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA",
    "id": 5678
}
```

The API supports a variety of methods which are detailed in this chapter.

<!-- ## `get_all_domains_for_owner`

Returns the list of SNS domains currently owned by a given account.

### Parameters

- **owner** `string` *required*: A base58-encoded Solana Pubkey.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string[]`: A list of owned domain names

## `get_domain_data`

Returns base64 encoded contents of the domain's data payload, or those of an associated record.

### Parameters

- **domain** `string` *required*: The domain name to query.
- **record** `string` *optional*: The associated record to get the data from instead.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: A base64 encoding of the record or domain's data payload.

## `get_domain_key`

Returns a domain's Solana account public key.

### Parameters

- **domain** `string` *required*: The domain name to query for.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: A base58-encoded Solana public key.

## `get_domain_record_key`

Returns a domain's Solana account public key.

### Parameters

- **domain** `string` *required*: The domain name to query for.
- **record** `string` *required*: The record identifier to query for.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: A base58-encoded Solana public key.

## `get_domain_reverse_key`

Returns a domain's reverse registry Solana account public key.

### Parameters

- **domain** `string` *required*: The domain name to query for.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: A base58-encoded Solana public key.

## `get_favourite_domain`

Returns a user wallet's favourite (i.e. primary) domain.

### Parameters

- **owner** `string` *required*: The base58-encoded Solana public key of the wallet to query for.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: The domain name.

## `get_registration_transaction`

Returns a ready-to-sign, base64-encoded transaction object to register a new SNS domain.

### Parameters

- **domain** `string` *required*: The domain name.
- **buyer** `string` *required*: The base58-encoded Solana public key of the buyer's paying wallet.
- **buyer_token_account** `string` *required*: The base58-encoded Solana public key of the buyer's paying token account.
- **space** `integer` *required*: The number of bytes to allocate in the new registered domain.
- **mint** `string` *optional*: The Solana public key of the Token mint used for payment, defaults to `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` (USDC).
- **referrer_key** `string` *optional*: The base58-encoded Solana public key of the registration referrer.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: The base64-encoded Solana Transaction object.

## `get_subdomains`

Returns a list of currently registered subdomains for a given domain.

### Parameters

- **domain** `string` *required*: The domain name.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string[]`: The list of currently registered subdomain names.

## `get_supported_records`

Returns a list of all the currently supported record types.

### Parameters

None

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string[]`: The list of currently supported record types.

## `resolve_domain`

Returns the resolved Solana Public key associated to a domain.

### Parameters

- **domain** `string` *required*: The domain name to resolve.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: The base-58 encoded Solana Public Key the domain resolves to.

## `reverse_lookup`

Returns the domain name associated with a raw SNS account.

### Parameters

- **domain_key** `string` *required*: The base58-encoded public key of the Solana account to reverse lookup.

### Result

The result will be an RPCResponse JSON object with field:

- **value** `string`: The domain name. -->

# `get_registration_transaction`

Returns a ready-to-sign, base64-encoded transaction object to register a new SNS domain.

## Parameters

- **domain** `string` *required*: The domain name.
- **buyer** `string` *required*: The base58-encoded Solana public key of the buyer's paying wallet.
- **buyer_token_account** `string` *required*: The base58-encoded Solana public key of the buyer's paying token account.
- **space** `integer` *required*: The number of bytes to allocate in the new registered domain.
- **mint** `string` *optional*: The Solana public key of the Token mint used for payment, defaults to `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` (USDC).
- **referrer_key** `string` *optional*: The base58-encoded Solana public key of the registration referrer.

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string`: The base64-encoded Solana Transaction object.

# Registration

> **Deprecated:** The `registerDomainName` function is being deprecated as it relies on the older Pyth smart contract on Solana, which is scheduled to be sunsetted at the end of May 2024. Please transition to using `registerDomainNameV2` for future domain registrations.

Easily integrate SNS domain registrations into your applications using our SNS Widget React Component. See a default usage example below. You can also customize the widget to fit your unique needs. More information is available here: https://github.com/Bonfida/sns-widget/blob/main/README.md

```js
import Widget from "@bonfida/sns-widget";
// Apart from the component itself, you also need to import styles separately
import "@bonfida/sns-widget/style.css";

// Link to public RPC for Solana connection. Solana provides free public RPCs
// with rate limiters, so you might want to use your own RPC Node provider
const PUBLIC_RPC = "https://api.mainnet-beta.solana.com";

export const Component = () => {
  return <Widget endpoint={PUBLIC_RPC} />;
};
```

You can also opt to create registration instructions via our SDK or API, both methods are equivalent. To register a domain you will have to specify the following:

- Domain names
- Space (between 1kb and 10kb)
- The public key of the buyer

Domain names can be registered with the following tokens: USDC, USDT, wSOL, FIDA, mSOL, BONK and BAT.

> **Note:** The registration instruction does not support native SOL but wrapped SOL

## Asset pricing

<p align="center">
<a href="https://pyth.network/" target="_blank">
<img src="../assets/partner-logos/pyth-logo.svg" alt="Pyth Network" width="200" height="auto"/>
</a>
</p>

Token pricing data during domain registration is provided to us by our friends at Pyth Network. Learn more about their Blockchain Oracle at [Pyth Network](https://pyth.network/).

## SDK

Unregistered domains can be registered using the SDK `@bonfida/spl-name-service` with the following instructions:

```js
import { registerDomainNameV2 } from "@bonfida/spl-name-service";

const name = "bonfida"; // We want to register bonfida.sol
const space = 1 * 1_000; // We want a 1kB sized domain (max 10kB)

const buyer = new PublicKey("..."); // Publickey of the buyer
const buyerTokenAccount = new PublicKey("..."); // Publickey of the token account of the buyer (USDC)

const ix = await registerDomainNameV2(name, space, buyer, buyerTokenAccount);

// sign and send the instruction
```

## API

Registration instructions can also be created via API (equivalent to using the SDK):

```
GET https://sns-sdk-proxy.bonfida.workers.dev/register?buyer={buyer}&domain={domain}&space={space}&serialize={serialize}
```

This endpoint can be used to register domain for buyer. Additionaly, the buyer dans specify the space it wants to allocate for the domain account. In the case where serialize is true the endpoint will return the transaction serialized in the wire format base64 encoded. Otherwise it will return the instruction in the following format: `{ programId: string, keys: {isWritable: boolean, isSigner: boolean, pubkey: string}[], data: string }` where `data` is base64 encoded.

This endpoint also supports the optional mint parameter to change the mint of the token used for registration (currently supports USDC, USDT, FIDA and wSOL), if mint is omitted it defaults to USDC.

## Registration via CPI

Add the `sns-registrar` dependency to your `Cargo.toml`:

```toml
[dependencies]
sns-registrar = { git = "ssh://git@github.com/Bonfida/sns-registrar.git", features = ["no-entrypoint"] }
```

In your code make sure to import the required functions

```rust
use sns_registrar::{instruction_auto::create_split_v2, processor::create_split_v2};
```

The main function for domain registration is `create_split_v2`. Here's how to use it:

```rust
let registration_instruction = create_split_v2(
    sns_registrar::ID,
    create_split_v2::Accounts {
        naming_service_program: accounts.spl_name_service.key,
        root_domain: accounts.root_domain.key,
        name: accounts.name_account.key,
        reverse_lookup: accounts.reverse_lookup.key,
        system_program: accounts.system_program.key,
        central_state: accounts.sns_registrar_central_state.key,
        buyer: accounts.buyer.key,
        domain_owner: accounts.new_domain_owner.key,
        buyer_token_source: accounts.buyer_token_source.key,
        pyth_feed_account: accounts.pyth_feed_account.key,
        vault: accounts.bonfida_fee_vault.key,
        spl_token_program: accounts.spl_token_program.key,
        rent_sysvar: accounts.rent_sysvar.key,
        state: accounts.sns_registrar_state.key,
        referrer_account_opt: None,
        fee_payer: accounts.fee_payer.key,
    },
    create_split_v2::Params {
        name: domain_name,
        space: 0,
        referrer_idx_opt: None,
    },
);
```

Important Account Keys:

- `sns_registrar`: Constant key `jCebN34bUfdeUYJT13J1yG16XWQpt5PDx6Mse9GUqhR`
- `naming_service_program`: Constant key `namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX`
- `root_domain`: Constant key `58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx`
- `central_state`: Constant key `33m47vH6Eav6jr5Ry86XjhRft2jRBLDnDgPSHoquXi2Z`
- `name`: Computed using `sns_registrar::utils::get_name_key("something", None)?;` for registering `something.sol`
- `reverse_lookup`: Computed using `sns_registrar::utils::get_reverse_key(accounts.name_account.key, None)?;`
- `pyth_feed_account`: Derived based on the mint used for registration. See Pyth price feed derivation and token utilities
- `vault`: ATA of `5D2zKog251d6KPCyFyLMt3KroWwXXPWSgTPyhV22K2gR` for the mint used in registration
- `state`: PDA derived as: `Pubkey::find_program_address(&[&accounts.name_account.key.to_bytes()], accounts.sns_registrar.key).0`
- `domain_owner` and `buyer` can be different this flexibility enables scenarios where one account pays for the registration while another becomes the owner of the domain.
- `buyer_token_source` is the associated token account of `buyer` for the mint used for the registration and used to pay the registration

After creating the instruction, invoke it like this:

```rust
invoke_signed(
    &registration_instruction,
    &[
        accounts.sns_registrar.clone(),
        accounts.spl_name_service.clone(),
        accounts.root_domain.clone(),
        accounts.name_account.clone(),
        accounts.reverse_lookup.clone(),
        accounts.system_program.clone(),
        accounts.sns_registrar_central_state.clone(),
        accounts.central_state.clone(),
        accounts.fee_payer.clone(),
        accounts.destination_token_vault.clone(),
        accounts.pyth_feed_account.clone(),
        accounts.bonfida_fee_vault.clone(),
        accounts.spl_token_program.clone(),
        accounts.rent_sysvar.clone(),
        accounts.sns_registrar_state.clone(),
        accounts.new_domain_owner.clone(),
    ],
    &[&signer_seeds],
)?;
```

- The `space` parameter in `create_split_v2::Params` is set to `0` in this example.
- The `referrer_account_opt` and `referrer_idx_opt` are set to `None` here. Use these for referral functionality if required.

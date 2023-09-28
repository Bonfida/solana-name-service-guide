# SNS SDK

The SNS SDK monorepo can be found [here](https://github.com/Bonfida/sns-sdk). It contains SDK for:

- [A Rust SDK](https://crates.io/crates/sns-sdk)
- [A Javascript SDK](https://github.com/Bonfida/sns-sdk#javascript)
- [A React hooks library](https://github.com/Bonfida/sns-sdk#react)
- [A Vue SDK](https://github.com/Bonfida/sns-sdk/tree/main#vue)
- [A CLI](https://github.com/Bonfida/sns-sdk#cli)

## Installation

### Rust SDK

```
cargo add sns-sdk
```

or

```
sns-sdk = "0.1.0"
```

### JS Library

To install the [JS library](https://www.npmjs.com/package/@bonfida/spl-name-service)

```js
npm i @bonfida/spl-name-service
```

or

```js
yarn add @bonfida/spl-name-service
```

To install the React

### React hooks

To install the [React hooks library](https://www.npmjs.com/package/@bonfida/sns-react)

```
npm i @bonfida/sns-react
```

or

```
yarn add @bonfida/sns-react
```

### Vue SDK

To install the [Vue SDK](https://www.npmjs.com/package/@bonfida/sns-vue)

```
npm i @bonfida/sns-vue
```

or

```
yarn add @bonfida/sns-vue
```

### CLI

```
cargo install --git https://github.com/Bonfida/sns-sdk.git sns
```

## Example

The following examples show how to resolve the domain `bonfida.sol`:

1. With the JS SDK

```js
const connection = new Connection(clusterApiUrl("mainnet-beta"));
const owner = await resolve(connection, "bonfida");
expect(owner.toBase58()).toBe("HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA");
```

2. With the Rust SDK

```rust
let client = RpcClient::new(std::env::var("RPC_URL").unwrap());
let res = resolve_owner(&client, "bonfida").await.unwrap();
assert_eq!(res, pubkey!("HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA"));
```

3. With the CLI

```bash
$ sns resolve bonfida

+---------+----------------------------------------------+----------------------------------------------------------------------------------+
| Domain  | Owner                                        | Explorer                                                                         |
+---------+----------------------------------------------+----------------------------------------------------------------------------------+
| bonfida | HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA | https://explorer.solana.com/address/HKKp49qGWXd639QsuH7JiLijfVW5UtCVY4s1n2HANwEA |
+---------+----------------------------------------------+----------------------------------------------------------------------------------+
```

5. With the React SDK

```ts
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useDomainOwner, useDomainsForOwner } from "@bonfida/sns-react";

export const Example = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const { result } = useDomainOwner(connection, "bonfida");
  // ...
};
```

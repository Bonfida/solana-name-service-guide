# FAQ

## Where can I buy a domain?

You can buy a domain on the [Solana Name Service website](https://sns.id)

## How do I find a domain if I only know its public key?

If you only know the public key of a domain you can do a reverse look up to find the associated domain. For example:

```js
import { reverseLookup } from "@bonfida/spl-name-service";

// Public key of bonfida.sol
const domainKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

const domainName = await reverseLookup(connection, domainKey); // bonfida
```

## How do I find the public key of a domain?

If you want to find the public key of a domain you need to derive it:

```js
import { getDomainKeySync } from "@bonfida/spl-name-service";

const domain = "bonfida"; // With or without the .sol

// Step 2
const { pubkey } = getDomainKeySync(domain);
```

## How can I find the content of a domain?

You can access the content of a domain by retrieving its registry:

```js
const { registry } = await NameRegistryState.retrieve(connection, domainKey);
const { parentName, owner, class, data } = registry;
```

## How do I find the twitter handle of a public key?

To find the twitter handle of a public key

```js
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";

const pubkey = new PublicKey("FidaeBkZkvDqi1GXNEwB8uWmj9Ngx2HXSS5nyGRuVFcZ");

const [handle] = await getHandleAndRegistryKey(connection, pubkey);
```

## How do I find the public key of a twitter handle?

To find the public key of a twitter handle

```js
import { getTwitterRegistry } from "@bonfida/spl-name-service";

const handle = "bonfida";

const registry = await getTwitterRegistry(connection, handle);
```

## How do I find all the subdomains of a domain?

You can find all the subdomains using the following RPC filter:

```js
const filters = [
  {
    memcmp: {
      offset: 32,
      bytes: userAccount.toBase58(),
    },
  },
  {
    memcmp: {
      offset: 0,
      bytes: parent_key.toBase58(),
    },
  },
];
```

## How do I find all the subdomains of a user?

You can find all the subdomains of a user by doing the following

1. Retrieve all the domains of the user
2. Iterate over the domains and retrieve the subdomains for each

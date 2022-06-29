# Registration

Registration instructions can be created either via SDK or API, both methods are equivalent. To register a domain you will have to specify the following:

- Domain names
- Space (between 1kb and 10kb)
- The public key of the buyer

## SDK

Unregistered domains can be registered using the SDK `@bonfida/spl-name-service` with the following instructions:

```js
import { registerDomainName } from "@bonfida/spl-name-service";

const name = "bonfida"; // We want to register bonfida.sol
const space = 1 * 1_000; // We want a 1kB sized domain (max 10kB)

const buyer = new PublicKey("..."); // Publickey of the buyer
const buyerTokenAccount = new PublicKey("..."); // Publickey of the FIDA token account of the buyer

const [, ix] = await registerDomainName(name, space, buyer, buyerTokenAccount);

// sign and send the instruction
```

## API

Registration instructions can also be created via API (equivalent to using the SDK):

```
POST https://naming-api.bonfida.com/registrar/new-domain
```

With the following request body

```json
{
  "domain": "domain_to_register",
  "pubkey": "pubkey_of_the_user",
  "space": "domain_space", // Between 1_000 and 10_000
  "language": "0"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "keys": [
      {
        "pubkey": "SysvarRent111111111111111111111111111111111",
        "isSigner": false,
        "isWritable": false
      },
      // ...
      {
        "pubkey": "62pexKUPWncYECF7DMtENjKbwZnrJoMpvDkrrtceC8Ee",
        "isSigner": false,
        "isWritable": false
      }
    ],
    "programId": "jCebN34bUfdeUYJT13J1yG16XWQpt5PDx6Mse9GUqhR",
    "data": [
      9,
      // ...
      0
    ]
  }
}
```

More details about direct registration can be found [here](https://docs.bonfida.org/collection/how-to-create-a-solana-domain-name/purchasing-a-domain-name/direct-registration)

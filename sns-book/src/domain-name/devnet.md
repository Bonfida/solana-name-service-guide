# Devnet

Testing can be done on devnet with many of the same functions and methods previously described in this chapter, using the devnet module of the JavaScript SDK. A connection object created from a devnet RPC URL will need to be passed to these functions.

```js
import { devnet } from "@bonfida/spl-name-service";

// Use Solana devnet RPC URL or a custom RPC URL
const connection = new Connection("https://api.devnet.solana.com");
```

## Register Devnet Domains

Many of the utility and binding functions in the devnet module will require existing devnet domain names. Use the `registerDomainName` binding to register domains on devnet to be used in testing.

### Notes: 

- The signer must have a WSOL ATA (Associated Token Account) initialized and funded for the transaction to succeed.
- `window.solana.publicKey` refers to a connected Phantom wallet in the browser. Alternatively, you may use a hardcoded or loaded-from-file KeyPair (Public + Private) to sign in DEVMODE.
- To obtain WSOL, first airdrop SOL to the account, then use the Solana CLI with the `spl-token wrap` command. The amount must be less than your SOL balance.
- If you are registering the domain on behalf of a second party, the receiver account/wallet must also have a WSOL ATA (you would pay the minRentExempt to initialize it).
- Your WSOL balance must be sufficient to cover the domain price, which you will find in the transaction response. Typically, 0.8 WSOL should be more than enough.
- Try to test with long-cheap subdomains. Short names will be more expensive, and you may need to airdrop more SOL, etc.
- If you encounter an error when airdropping, try reducing the amount, for example, from 1 to 0.7, until it succeeds.
- For convenience, you may use a free Helius RPC endpoint. These have more capacity for airdrops.
```bash
> spl-token wrap <AMMOUNT> 
```

```js
const registerDevnetDomain = async () => {
    const senderATASync =  getAssociatedTokenAddressSync(NATIVE_MINT, window.solana.publicKey, true);
    console.log('senderATASync', senderATASync);
    const senderTokenAccount =   await getOrCreateAssociatedTokenAccount(
        connection,
        window.solana,
        NATIVE_MINT,
        window.solana.publicKey,
        true, // Allow creating a token account for the receiver if it doesn't exist
    );
    console.log('senderTokenAccount', senderTokenAccount);

    //--- 
    const [, ixs] = await devnet.bindings.registerDomainName(
        connection,
        searchSNSfor, // The name of the domain you want to register
        1_000,
        window.solana.publicKey, // PublicKey of fee payer
        getAssociatedTokenAddressSync(NATIVE_MINT, window.solana.publicKey, true),
        NATIVE_MINT
    );
    console.log(ixs);

    //---
    const tx = new Transaction();
    const latestBlockHash = await connection.getLatestBlockhash('finalized');
    tx.recentBlockhash = await latestBlockHash.blockhash;
    tx.feePayer = window.solana.publicKey;
    console.log(tx);
    tx.add(...ixs);
    // - You could signAndSend in the same call etc, but for clarity I like to separate the steps. 
    const signedTx = await window.solana.signTransaction(tx);
    console.log(signedTx);

    const signature = await connection.sendRawTransaction(signedTx.serialize());
    console.log(signature);
    // confetti
}
```

## Utils

The devnet module contains utility functions for lookup and derivation tasks for usage with devnet out of the box. An example of the `reverseLookup` function which looks up a human readable domain from the public key of a domain name registry, is below.

```js
// Public key of bonfida.sol
const domainKey = new PublicKey("Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb");

const domainName = await devnet.utils.reverseLookup(connection, domainKey); // bonfida
```

## Constants

A set of devnet constants are also provided for use with custom functions as well as with the bindings described below. An example of deriving the `NAME_PROGRAM_ID` is below.

```js
const programId = devnet.constants.NAME_PROGRAM_ID;
```

## Bindings

For more in depth domain name interactions like creating, updating, deleting, or transfering domains and records, bindings from the devnet module can be used. An example using the `createNameRegistry` function is below.

```js
// Domain name to transfer
const domain = "devnet-test-5";

// New owner of the domain
const newOwner = new PublicKey("...");

// The .sol TLD
const nameParent = dev.constants.ROOT_DOMAIN_ACCOUNT;

const ix = await devnet.bindings.transferNameOwnership(
  connection,
  domain,
  newOwner,
  undefined, // Optional class of the domain name, if it exists
  nameParent
);

// Sign and send instruction
```

## Example: Check Domain + Subdomain availabilty. 

The following method contains objects that you need to adapt to your own implememtation. Namely the "props.params.network" and "form.searchSNSfor" objects need to be replaced. 

```js
const checkDomainOrSubDomain = async () => {
    console.log('Network: ', props.params.network);
    let domainObj = {};
    let domainString = form.searchSNSfor.toLowerCase();
    domainString = domainString.replace(/\s+/g, '-');
    // replace .sol with empty string
    domainString = domainString.replace('.sol', '');
    //extract domain name and subdomain
    domainObj.searchString = domainString;
    domainObj.domain = domainString.split('.').pop();
    domainObj.subDomain = domainString.split('.').shift();
    // If the query-string includes a subdomain
    // Resolve Subdomain Pubkey & Availability (no-registry found)
    if (domainObj.subDomain !== domainObj.domain) {
        if (props.params.network === 'devnet') {
            domainObj.subPubkey =  devnet.utils.getDomainKeySync(domainObj.searchString).pubkey;
        }else{
            domainObj.subPubkey =  getDomainKeySync(domainObj.searchString).pubkey;
        }
        console.log('SubPK: ', domainObj.subPubkey);
        try {
            domainObj.subDomainRegistry = await NameRegistryState.retrieve(
                connection,
                domainObj.subPubkey
            );
            console.log('Subdomain is not available ', domainObj.subDomainRegistry);
        } catch (error) {
            console.log('Subdomain is available (No registry found)');
            isAvailable.value = true;
        }
    }
    // always resolve domain pubkey
    if (props.params.network === 'devnet') {
        domainObj.domainPk = devnet.utils.getDomainKeySync(domainObj.domain).pubkey;
    }else{
        domainObj.domainPk = getDomainKeySync(domainObj.domain).pubkey;
    }

    try {
        domainObj.domainRegistry = await NameRegistryState.retrieve(
            connection,
            domainObj.domainPk
        );
        console.log('Domain is not available');
        console.log('Domain Registry: ', domainObj.domainRegistry);
        isAvailable.value = false;

    } catch (error) {
        console.log(searchSNSfor.value + '.sol Is Available');
        isAvailable.value = true;

    }
    //console.log('DomainResolutionObj: ', domainObj);
    return domainObj;
};
```


# Guide for wallets

Below is the correct methodology to resolve `.sol` domain names. If you are a wallet or a service provider using SNS to send funds please make sure to follow these guidelines to avoid loss of funds.

![wallet-guide](./assets/wallet-guide.png)

1. Check if the domain name is tokenized

   - **Yes:** The correct destination of funds is the token holder
   - **No:** Go to step 2

2. Check the SOL record

   - If the SOL record is set and the expected owner matches the actual owner of the domain, the destination specified in the record is the correct destination.
   - Else go to step 3

3. The correct destination of funds is the domain owner

A JS implementation would be as follow:

```js
export const resolve = async (connection: Connection, domain: string) => {
  const { pubkey } = await getDomainKey(domain);

  const { registry, nftOwner } = await NameRegistryState.retrieve(
    connection,
    pubkey
  );

  if (nftOwner) {
    return nftOwner;
  }

  try {
    const solRecord = await getSolRecord(connection, domain);
    if (solRecord.data?.length !== 64) {
      throw new Error("Invalid SOL record data");
    }

    if (registry.owner.toBuffer().compare(solRecord.data.slice(32, 64)) !== 0) {
      throw new Error("SOL record owner mismatch");
    }

    return new PublicKey(solRecord.data.slice(0, 32));
  } catch (err) {
    console.log(err);
  }

  return registry.owner;
};
```

> Not resolving domains properly might lead to loss of funds ⚠️

## FAQ

1. What happens if funds are sent to the `NameRegistry` owner when the domain is tokenized?

As long as the user owns the tokenized domains (i.e the NFT) they will be able to withdraw from the PDA escrow that received the funds. However, if for some reason the user does not own the NFT he won't be able to withdraw the funds.

2. Why is there two public keys in the SOL record?

The SOL record data contains a 64-byte array that is the concatenation of two public keys. The first 32 bytes represent public key to which funds should be sent and the next 32 bytes are the public key of the _expected_ owner of the domain. If the expected domain does not match the actual owner of the domain funds **must not** be transfered.

The expected owner is required to prevent funds being sent to a stale SOL record after a domain was transfered or sold to a new owner.

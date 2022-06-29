# Get all domains of a user

You can retrieve all the domains owned by a public key using a `MemcmpFilter` filter

```js
export async function findOwnedNameAccountsForUser(
  connection: Connection,
  userAccount: PublicKey
): Promise<PublicKey[]> {
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
        bytes: SOL_TLD_AUTHORITY.toBase58(),
      },
    },
  ];
  const accounts = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
    filters,
  });
  return accounts.map((a) => a.pubkey);
}
```

# TLD

Top Level Domains (TLDs) are required to resolve domain names.

The `.sol` TLD is

```js
export const SOL_TLD_AUTHORITY = new PublicKey(
  "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
);
```

The `.sol` TLD is owned by the `root` TLD

```js
export const ROOT_TLD_AUTHORITY = new PublicKey(
  "ZoAhWEqTVqHVqupYmEanDobY7dee5YKbQox9BNASZzU"
);
```

All `.sol` domains are subdomains of the `.sol` TLD

![root-tld](../assets/root-tld.png)

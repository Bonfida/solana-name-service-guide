# Records V2

- Records V2 are currently in beta and susceptible to have breaking changes ⚠️
- Related to [SNS-IP-2](https://github.com/Bonfida/sns-ip/blob/master/proposals/sns-ip-2.md) and [SNS-IP-3](https://github.com/Bonfida/sns-ip/blob/master/proposals/sns-ip-3.md)

## Record V2 derivation

V2 Record keys can be derived with the `getRecordV2Key` function.

```js
const domain = "bonfida"; // With or without the .sol at the end
const record = Record.IPFS; // Import the Record enum from the spl-name-service library

const recordV2Key = getRecordV2Key(domain, record);
```

## Verify Staleness

You're able to verify the staleness of a record with Records V2. A record is stale when it was set up by a previous domain owner, and is no longer relevant to the current owner. The function returns a boolean indicating if the record is fresh or not.

```js
const freshRecord = await verifyStaleness(connection, record, domain);
```

## Verify Right of Association

You're also able to verify the authenticity of a record with Records V2 using the `verifyRightOfAssociation` function. The function returns a boolean indicating if the record is authentic or not. Unique to this function is the verifier parameter, which is the known public key of the on-chain/off-chain oracle used to verify authenticity of a record. This is currently supported for SOL, ETH, and URL records with support for further records on the way.

```js
const verifier = GUARDIANS.get(Record.URL); // Import GUARDIANS from the spl-name-service library

const ROA = await verifyRightOfAssociation(
  connection,
  record,
  domain,
  verifier.toBuffer()
);
```

Ethereum and Solana records are unique because they are self signing. To verify the authenticity of these records, we must pass the content of the record itself as the verifier agrument to the `verifyRightOfAssociation` function.

```js
const { retrievedRecord } = await getRecordV2(connection, domain, record); // Import getRecordV2 from the spl-name-service library

const ROA = await verifyRightOfAssociation(
  connection,
  record,
  domain,
  retrievedRecord.getContent()
);
```

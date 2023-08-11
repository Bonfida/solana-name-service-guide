# Records V2

- Related SNS-IP: [SNS-IP 2](TODO)

## Data structure

The code snippet provided illustrates a Borsh implementation in JavaScript for V2 Records.

```js
export enum GuardianSig {
  None = 0,
  Solana = 1,
  Ethereum = 2,
  Injective = 3,
}

export enum UserSig {
  None = 0,
  Solana = 1,
}

export class RecordV2Header {
  userSignature: UserSig;
  guardianSignature: GuardianSig;
  contentLength: number;

  static LEN: number = 2 + 2 + 4;

  static schema: Schema = new Map([
    [
      RecordV2Header,
      {
        kind: "struct",
        fields: [
          ["userSignature", "u16"],
          ["guardianSignature", "u16"],
          ["contentLength", "u32"],
        ],
      },
    ],
  ]);

  // ...
}

// ...

export class RecordV2 {
  header: RecordV2Header;
  buffer: Buffer;

  constructor(obj: { header: RecordV2Header, buffer: Buffer }) {
    this.header = obj.header;
    this.buffer = obj.buffer;
  }

  /**
   * This function deserializes a buffer into a `RecordV2`
   * @param buffer The buffer to deserialize into a `RecordV2`
   * @returns A RecordV2
   */
  static deserializeUnchecked(buffer: Buffer): RecordV2 {
    const header = deserializeUnchecked(
      RecordV2Header.schema,
      RecordV2Header,
      buffer
    );
    return new RecordV2({
      header,
      buffer: Buffer.from(buffer.slice(RecordV2Header.LEN)),
    });
  }

  // ...
}
```

## User and guardian signatures

User and guardian signatures solve two of the records V1 issues: staleness and authenticy.

- **Staleness of Records:** When domain names are traded, records associated with these domains can become outdated but remain accessible, leading to potential misinformation or misuse. The staleness can verified via the `checkUserSignature` of the `RecordV2` class.

- **Resource Authenticity:** It is challenging to verify that the domain owner genuinely owns the resources linked in the records. This ambiguity paves the way for impersonation and can lead to potential security breaches. The resource authenticity can verified via the `checkGuardianSignature` of the `RecordV2` class.

## Record V2 derivation

Record V2 keys differ from V1 by the derivation prefix: `\x02` instead of `\x01`

### Examples

| Domain        | Record Version | Record | Record key                                   |
| ------------- | -------------- | ------ | -------------------------------------------- |
| something.sol | V1             | CNAME  | 3RfzNCvEqEKZeohqVN16Z1oi6rw5TrANwqAo4hMx6njv |
| something.sol | V2             | CNAME  | 5vaMyshvmnpmmfzrqYCazUcBrMr6bVw9dqJoRAvzpkdm |

## Resolving records V2

To fetch V2 records, developers have the option to retrieve individual records or fetch multiple records in a batch.

1. Fetching Single V2 Records: `RecordV2.retrieve`

   - **Purpose:** Retrieves a single V2 record.
   - **Usage:** Suitable for operations where only one account's data is required.

2. Fetching Multiple V2 Records: `RecordV2.retrieveBatch`

   - **Purpose:** Efficiently fetches multiple V2 records in one go.
   - **Underlying Mechanism:** This method leverages the [getMultipleAccounts](https://docs.solana.com/api/http#getmultipleaccounts) API to optimize RPC requests, ensuring efficient and fast retrieval when dealing with multiple accounts.

```js
test("Fetch record", async () => {
  const domain = "record-v2";
  const record = await RecordV2.retrieve(connection, Record.TXT, domain, {
    skipGuardianSig: true,
    skipUserSig: true,
  });
  expect(record.deserializeContent(Record.TXT)).toBe("test");
});

test("Fetch records", async () => {
  const domain = "record-v2";
  const [txt, cname] = await RecordV2.retrieveBatch(
    connection,
    [Record.TXT, Record.CNAME],
    domain
  );
  expect(txt?.deserializeContent(Record.TXT)).toBe("test");
  expect(cname?.deserializeContent(Record.CNAME)).toBe("google.com");
});
```

## Creating & Updating records V2

1. Creating Records V2: `createRecordV2Instruction`

   - **Purpose:** Initializes a new V2 record account.
   - **Limitation:** While this instruction can set up a new account, it does not serialize or write any data into the account. To populate the account with data, refer to the updateRecordV2Instruction method.

2. Updating Records V2: `updateRecordV2Instruction`

   - **Purpose:** Writes or modifies data within an existing V2 record account.
   - **Flexibility:** This method is designed to handle data of varying lengths. If the new data differs in length from the existing data, the account will be resized automatically to accommodate the change.

```js
import { RecordV2 } from "@bonfida/spl-name-service";
import { Record } from "@bonfida/spl-name-service";
import { Transaction } from "@solana/web3.js";
import {
  createRecordV2Instruction,
  updateRecordV2Instruction,
} from "@bonfida/spl-name-service";

// Creating a record v2

const domain = "something";
const owner = new PublicKey("..."); // Owner of something.sol
const recordV2 = RecordV2.new("something", Record.Github);
const ix = await createRecordV2Instruction(
  connection,
  domain,
  Record.Github,
  recordV2,
  owner,
  owner
);
const tx = new Transaction().add(ix);

// Sign and send tx...

// Updating a record v2
const recordV2 = RecordV2.new("test", Record.TXT);
const ix = await updateRecordV2Instruction(
  connection,
  domain,
  Record.TXT,
  recordV2,
  owner,
  owner
);
const tx = new Transaction().add(...ix);

// Sign and send tx...
```

## Deleting a record V2

Developers have the capability to delete V2 records. Once a record is deleted, the rent associated with its creation is reimbursed to the `payer`.

1. Deleting a V2 Record: deleteRecordV2

   - **Purpose:** Deletes a specified V2 record.
   - **Rent Reimbursement:** Upon successful deletion, the rent that was paid during the account creation is refunded to the payer of the transaction.
   - **Note:** It's important to understand that even after a record has been deleted, it can be re-created at a later time, should the need arise.

```js
import { Record } from "@bonfida/spl-name-service";
import { Transaction } from "@solana/web3.js";
import { deleteRecordV2 } from "@bonfida/spl-name-service";

const domain = "something";
const owner = new PublicKey("...");
const ix = await deleteRecordV2(domain, Record.TXT, owner, owner);
const tx = new Transaction().add(ix);
```

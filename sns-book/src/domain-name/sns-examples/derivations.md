# Key derivations

The following examples can be used to test your derivations:

## Domain name

- `solana.sol`:
  - Public key: `9TdKztwu2cS3JConXYEwqscjuCixgQqFq1pAiPQEbkSy` ([Explorer link](https://solana.fm/address/9TdKztwu2cS3JConXYEwqscjuCixgQqFq1pAiPQEbkSy))
  - Reverse key: `AceeTYYPKzfmEd9uht5cB9ATMFEjJPcG1VLCRvgiV4fy` ([Explorer link](https://solana.fm/address/AceeTYYPKzfmEd9uht5cB9ATMFEjJPcG1VLCRvgiV4fy))
- `bonfida.sol`:
  - Public key: `Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb` ([Explorer link](https://solana.fm/address/Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb))
  - Reverse key: `DqgmWxe2PPrfy45Ja3UPyFGwcbRzkRuwXt3NyxjX8krg` ([Explorer link](https://solana.fm/address/DqgmWxe2PPrfy45Ja3UPyFGwcbRzkRuwXt3NyxjX8krg))
- `01.sol`:
  - Public key: `8nZ7dyd6fFSiHTV5qUCNz6kMLzVcgKgHVsDvE8AvPyq9` ([Explorer link](https://solana.fm/address/8nZ7dyd6fFSiHTV5qUCNz6kMLzVcgKgHVsDvE8AvPyq9))
  - Reverse key: `GFG4HcxU5URRfBxFLV9xvmJo6mdHCunEm2DRHc3aNtfL` ([Explorer link](https://solana.fm/address/GFG4HcxU5URRfBxFLV9xvmJo6mdHCunEm2DRHc3aNtfL))

## Subdomain

- `dex.solana.sol`:

  - Public key: `F1A1iznr16YfnWAnLXLKvS3aStm4VHwkheMD786KW8Ca` ([Explorer link](https://solana.fm/address/F1A1iznr16YfnWAnLXLKvS3aStm4VHwkheMD786KW8Ca))
  - Reverse key: `9gT93HfjZVHT8xHrJvzV7eRFs5bnXhPAsEpxvgvCsDaw` ([Explorer link](https://solana.fm/address/9gT93HfjZVHT8xHrJvzV7eRFs5bnXhPAsEpxvgvCsDaw))

- `dex.bonfida.sol`:

  - Public key: `HoFfFXqFHAC8RP3duuQNzag1ieUwJRBv1HtRNiWFq4Qu` ([Explorer link](https://solana.fm/address/HoFfFXqFHAC8RP3duuQNzag1ieUwJRBv1HtRNiWFq4Qu))
  - Reverse key: `6tAdEpjsrzHuRqJW3XMXEV7DFyCWW4giW6mW4bgvhcYV` ([Explorer link](https://solana.fm/address/6tAdEpjsrzHuRqJW3XMXEV7DFyCWW4giW6mW4bgvhcYV))

## Record

- `solana.sol` IPFS record:

  - Public key: `GvncrrXMGsBMtwg2uh8FShUqLS4GLtYrmBeCdX5PEbPR` ([Explorer link](https://solana.fm/address/GvncrrXMGsBMtwg2uh8FShUqLS4GLtYrmBeCdX5PEbPR))

- `bonfida.sol` URL record:
  - Public key: `CvhvqcxBbA4UdWuJFDMuuC4XbpCrAd9gidpW5wxEsjg5` ([Explorer link](https://solana.fm/address/CvhvqcxBbA4UdWuJFDMuuC4XbpCrAd9gidpW5wxEsjg5))

## 💡 Difference between records and subdomains

In practice, let us consider the name `foo.sol` . If we want to find the domain's A record, containing an associated IPv4 address, then we can find it by querying `\1A.foo.sol`, with \1 the character of code value 1. The specification makes use of this prefix in order to differentiate between actual domains and records, which means that it is still possible to use the `A.foo.sol` subdomain with no collision.
In addition to this, the special `\1.foo.sol` is reserved to hold the list of all currently initialized records for a given subdomain

> **Note:** `\0` and `\1` are convenient notations for:
>
> - `\0 = \x00`.
> - `\1 = \x01`.

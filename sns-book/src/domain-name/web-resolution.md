# Web resolution

## Web resolvers

While SNS offers numerous benefits, its separation from the traditional Domain Name System (DNS) can present challenges for adoption and accessibility. To address these challenges, we are building the necessary infrastructure to bridge the gap between SNS and DNS, making it easier for users to interact with SNS through familiar methods.

Below are three such methods for resolving .sol domain names:

- Natively in the [Brave browser](https://brave.com)
<!-- - Via the [Backpack](https://www.backpack.app) wallet extension -->
- Through a proxy service called [sol-domain.org](https://github.com/SolanaNameService/name-resolver)

### Brave browser

The [Brave browser](https://brave.com) supports native resolution of .sol domain names, allowing users to access Solana Name Service domains directly from the URL bar. To resolve an SNS domain in the Brave browser, simply type the domain followed by `.sol` in the URL bar, and press Enter. For instance, to access the [Pyth network website](https://pyth.network/), you would enter `pyth.sol` in the URL bar.

<!-- ## Backpack

[Backpack](https://www.backpack.app) is a wallet extension that supports SNS domain resolution. By using Backpack, users can resolve .sol domain names directly from their browser. To resolve a .sol domain with Backpack, simply

- Install the wallet extension
- Enable `Solana` in the `Domain Website Resolver` settings
- Enter the .sol domain you want to resolve directly in the browser's search bar (e.g., `pyth.sol`)
- The Backpack extension will automatically detect the .sol domain and redirect you -->

### Resolution via sol-domain.org Proxy Service

The [sol-domain.org](https://github.com/SolanaNameService/name-resolver) service is a proxy that enables users to access SNS domains via the traditional DNS system. To resolve a .sol domain using sol-domain.org, append the domain name to the beginning of the sol-domain.org URL. For example, to resolve the `pyth.sol` domain, you would enter [https://pyth.sol-domain.org](https://pyth.sol-domain.org/) in the URL bar of your browser.

## Resolving .sol domain names in practice

The process for resolving `.sol` domain names follows a defined set of rules based on different types of records: URL, IPFS, Arweave, and Shadow Drive. The resolution process checks for these records in the specified order until it finds a valid record.

### Step-by-step process

#### Step 1: URL Record

First, check if the URL record exists and is valid. If so, this is the website to resolve to. The URL record typically contains the HTTP or HTTPS link to the website hosted on the domain.

#### Step 2: IPFS Record

If there is no valid URL record, proceed to check for an IPFS record.

If the IPFS record exists and is valid, the user should be redirected to the corresponding IPFS content via an IPFS gateway. An IPFS gateway acts as a bridge between the traditional web and the IPFS network, allowing browsers that don't natively support IPFS to access IPFS content.

#### Step 3: Arweave Record

If neither a URL nor an IPFS record is found or valid, check for an Arweave record.

If the Arweave record exists and is valid, the user should be redirected to the Arweave content via an Arweave gateway. Similar to the IPFS gateway, an Arweave gateway allows users to access Arweave-hosted content through traditional web browsers.

#### Step 4: Shadow Drive Record

Lastly, if no URL, IPFS, or Arweave records are found or valid, check for a Shadow Drive record.

If the Shadow Drive record exists and is valid, the user should be redirected to the content via a Shadow Drive gateway. Like IPFS and Arweave gateways, a Shadow Drive gateway provides access to Shadow Drive-hosted content for traditional web browsers.

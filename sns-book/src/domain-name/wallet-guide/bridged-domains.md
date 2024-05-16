# How to resolve a .sol domain cross-chain?

The Solana Name Service (SNS) going cross-chain means that it is expanding its functionality beyond the Solana ecosystem, enabling users to export their domain names to alternative blockchains using the [Wormhole bridge](https://wormhole.com/). This move aims to increase the utility and adoption of SNS, while also fostering collaboration and interoperability between different blockchain networks. By allowing SNS domains to be resolved on supported chains like EVM-based chains and Injective, SNS becomes more accessible to a wider range of developers and users, promoting the growth of the Solana ecosystem and showcasing its capabilities beyond its native environment.

## EVM Chains

The Solana Name Service has been bridged to the following EVM chains:

- BNB Testnet (deployed at `0x4d50e149bb3d8c889f4ccdfffba0ef8016168d92`)
- BNB Mainnet (deployed at `0xd1Ae42Ce34E6b7ab5B41dcc851424F3cF410BF16`)

- BASESepolia (deployed at `0xc0B286f45d2D5D825aD42DcF49CB9eA39899E2c3`)
- BASE (deployed at `0x63E2FADb57BEd8A4c9c3C5a4937e7611ec88421F`)

Solana domain names bridged on EVM chains can be resolved using the NPM package [@bonfida/sns-warp-evm](https://www.npmjs.com/package/@bonfida/sns-warp-evm).

### Installation

With Yarn:

```
yarn add @bonfida/sns-warp-evm
```

With NPM

```
npm i @bonfida/sns-warp-evm
```

### Resolving a .sol domain

The following code can be used to resolve .sol domains on EVM chains

```js
import { SupportedChains, SNS } from "@bonfida/sns-warp-evm";

/**
 *
 * BNB Example
 *
 **/

// The domain name to resolve
const domain = "mock3.sol";
// The chain on which to resolve the domain
const targetChain = SupportedChains.BNBMainnet;

const sns = new SNS(SupportedChains.BNBMainnet);
const resolved = await sns.resolveName(domain);

console.log(resolved); // <- 0x1D719d2dB763f905b1924F46a5185e001Dd93786

/**
 *
 * BASE Example
 *
 **/

const sns = new SNS(SupportedChains.BASESepolia);
const resolved = await sns.resolveName("12c8566b3e8ab8b9edac2ceab89be3bd.sol");

console.log(resolved); // <- 0x5f8901Aa3a42BCB53792CfCeDa66a7cf735Af6Db
```

### Reverse look up

```js
import { SupportedChains, SNS } from "@bonfida/sns-warp-evm";
import { namehash } from "@ethersproject/hash";

// The chain on which to perform the reverse lookup
const targetChain = SupportedChains.BNBMainnet;

const sns = new SNS(targetChain);
const nameHash = namehash("mock3.sol");

const resolved = await sns.resolveReverse(nameHash);
console.log(resolved); // <- mock3
```

## Injective

The Solana Name Service has also been bridged to Injective.

- Injective Testnet (deployed at `inj1q79ujqyh72p43mhr2ldaly3x6d50rzp3354at3`)
- Injective Mainnet (deployed at `inj1v7chmgm7vmuwldjt80utmw9c95jkrch979ps8z`)

Solana domain names bridged to Injective can be resolved using the NPM package [@bonfida/sns-warp-injective](https://www.npmjs.com/package/@bonfida/sns-warp-injective).

SNS is also supported by the [Leap Wallet Name Match package](https://github.com/leapwallet/name-matcha).

### Installation

With Yarn:

```
yarn add @bonfida/sns-warp-injective
```

With NPM

```
npm i @bonfida/sns-warp-injective
```

### Resolving a .sol domain

The following code can be used to resolve .sol domains on Injective

```js
import { resolveName } from "@bonfida/sns-warp-injective";
import { Network } from "@injectivelabs/networks";

// The domain name to resolve
const domain = "bonfida.sol";
// The network on which to resolve the domain
const network = Network.Mainnet;

const resolved = await resolveName(domain, network);

console.log(resolved); // <- inj1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqe2hm49
```

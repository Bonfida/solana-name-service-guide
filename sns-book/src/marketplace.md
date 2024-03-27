# Marketplace

## SNS Marketplace

The SNS Marketplace program makes it possible to integrate the purchase and sale of SNS domains directly into your own applications. Interact with the SNS Marketplace smart contract using our JS SDK linked below.

### Deployment:

- Program ID: `85iDfUvr3HJyLM2zcq5BXSiDvUWfw6cSE1FfNBo8Ap29`
- Auditor: Halborn
- Audit report: [here](https://github.com/HalbornSecurity/PublicReports/blob/master/Solana%20Program%20Audit/Bonfida_SNS_Solana_Program_Security_Assessment_Report_Halborn_Final.pdf)
- JS SDK: [NPM](https://www.npmjs.com/package/@bonfida/name-offers)

This smart contract supports different types of sales:

- Fixed price
- Unsolicited
- Category
- P2P

The functions from our SDK detailed below will return instructions that you can use to build transactions.

Fixed price and unsolicited offers support the following tokens as quote currency: SOL, FIDA, USDC, USDT, mSOL, BONK, BAT, PYTH and bSOL.

All these listings can be accessed on [sns.id](https://www.sns.id/)

### Fixed Price Offers

```rust
pub struct FixedPriceOffer {
    /// Account tag
    pub tag: Tag,
    /// Nonce
    pub nonce: u8,
    /// Name being sold
    pub name_account: Pubkey,
    /// Offer owner
    pub owner: Pubkey,
    /// Quote token used for offer
    pub quote_mint: Pubkey,
    /// Amount of the offer
    pub offer_amount: u64,
    // Offer amount token account destination
    pub token_destination: Pubkey,
}
```

Fixed Price Offers allow sellers to list domain names for sale at a predetermined price. Buyers can purchase these domain names by paying the specified amount.

Creating a fixed price offer is handled by the `makeFixedPriceOffer` function, as shown in the code snippet below:

```ts
const connection = new Connection("...");
const seller = new PublicKey("..."); // Public key of the seller i.e domain owner
const mint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC mint
const amount = 1 * 1e6; // Amount with decimals, here 1 USDC
const { pubkey: domainKey } = getDomainKeySync("something.sol"); // Domain public key

const ix = await makeFixedPriceOffer(
  connection,
  amount,
  mint,
  seller,
  domainKey,
  NAME_OFFERS_ID // The program ID that can be imported directly from our SDK
);
```

Buying a fixed price offer is facilitated through the `buyFixedPrice` function, which ensures the transfer of the domain to the buyer and the payment to the seller:

```ts
const connection = new Connection("...");
const buyer = new PublicKey("..."); // Public key of the offer buyer
const source = new PublicKey("..."); // Source of the funds used to purchase the offer. In case of SOL it's the same as `buyer`. If another token is used, it's the ATA of the buyer for the given mint.
const { pubkey: domainKey } = getDomainKeySync("something.sol"); // Domain public key

// Use a util function from our SDK to get fixed price offers by name, by owner, or all fixed price offers.
const fixedPriceOffers = await getFixedPriceOffersForName(
  connection,
  domainKey
);

// This example arbitrarily selects the first fixed price offer in the list. Filter offers based on the your needs.
const fixedPriceKey = fixedPriceOffers[0].pubkey;

const ix = await buyFixedPrice(
  connection,
  fixedPriceKey,
  buyer,
  source,
  NAME_OFFERS_ID
);
```

Fixed price offers can be cancelled using the `cancelFixedPriceOffer` function.

### Unsolicited Offers

```rust
pub struct Offer {
    /// Tag
    pub tag: Tag,
    /// Nonce
    pub nonce: u8,
    /// Name account of the offer
    pub name_account: Pubkey,
    /// Offer owner
    pub owner: Pubkey,
    /// Quote token used for offer
    pub quote_mint: Pubkey,
    /// Amount of the offer
    pub offer_amount: u64,
    /// Escrow account key
    pub escrow: Pubkey,
}
```

Unsolicited offers allow buyers to propose a purchase price for a domain not listed for sale. The domain owner can then accept or ignore the offer.

Placing an unsolicited offers is handled by the `makeOffer` function

```ts
const mint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC mint
const amount = 1 * 1e6; // Amount with decimals, here 1 USDC
const { pubkey: domainKey } = getDomainKeySync("something.sol"); // Domain public key
const owner = new PublicKey("..."); // Owner of the unsolicited offer
const tokenSource = new PublicKey("..."); // Token source used to place the offer. In case of SOL it's the same as `owner`. If another token is used, it's the ATA of the owner for the given mint.

const ix = await makeOffer(
  amount,
  domainKey,
  owner,
  mint,
  tokenSource,
  NAME_OFFERS_ID
);
```

An unsolicited offer can be accepted by the domain owner using the `acceptOffer` function:

```ts
const connection = new Connection("...");
const domainOwner = new PublicKey("..."); // Current domain owner
const { pubkey: domainKey } = getDomainKeySync("something.sol"); // Domain public key
const offerEscrow = new PublicKey("..."); // PDA used to store the funds of the offer, the address is written in the state
const destination = new PublicKey("..."); // The token account used to receive the funds from the escrow

// Use a util function from the SDK to get offers by domain name, by domain owner, etc.
const offers = await getOffersForName(connection, "something.sol");

// This example arbitrarily selects the first offer in the list. Filter offers based on your needs.
const offerKey = offers[0].pubkey;
const offerOwner = offers[0].owner;

const ix = await acceptOffer(
  connection,
  NAME_OFFERS_ID,
  offerKey,
  offerOwner,
  publicKey,
  domainKey,
  offerEscrow,
  destination
);
```

Unsolicited offers can be canceled using the `cancelOffer` function.

### Category offers

```rust
pub struct CategoryOffer {
    // Account tag
    pub tag: Tag,
    // The PDA nonce
    pub nonce: u8,
    // The total number of domains requested
    pub nb_domains: u64,
    // The SOL price per domain
    pub sol_price: u64,
    // The category of the offer
    pub category: Pubkey,
    // The owner of the offer
    pub owner: Pubkey,
    // Timestamp at which the offer was created
    pub created_at: u64,
}
```

Category Offers allow buyers to bid on an entire domain category. Sellers can accept these offers, selling domains within the specified category.

The creation of a category offer is managed by the `makeCategoryOffer` function, which specifies the number of domains, the SOL price per domain, and the category:

```ts
import { CATEGORIES } from "@bonfida/sns-categories"; // Map of current categories

const amount = 10 * LAMPORTS_PER_SOL; // Amount of the offer in lamports here 10 SOL
const nbDomains = 10; // Number of domains the buyer wants to buy
const buyer = new PublicKey("...");

// Filter CATEGORIES to find the categoryKey which is the Public key of the category.
const categoryKey = [...CATEGORIES].find(
  ([, value]) => value === "999-club"
)?.[0];

const ix = await makeCategoryOffer(
  amount,
  nbDomains,
  categoryKey,
  NAME_OFFERS_ID,
  buyer
);
```

Taking a category offer is facilitated through the `takeCategoryOffer` function, allowing sellers to sell domains within the category at the specified price.

```ts
const connection = new Connection("...");
const { pubkey: domainKey } = getDomainKeySync("999.sol"); // Domain public key
const memberKey = CategoryMember.findKey("999", categoryKey); // Membership of the domain to the category
const seller = new PublicKey("..."); // Seller of the domain here 999.sol

// Use a util function from the SDK to get category offers by category, category offers for a specific owner, etc.
const categoryOffers = await getCategoryOffer(connection, categoryKey);
// This example arbitrarily selects the first category offer in the list. Filter offers based on your needs.
const categoryOfferKey = categoryOffers[0].pubkey;

const ix = await takeCategoryOffer(
  connection,
  NAME_OFFERS_ID,
  categoryOfferKey,
  domainKey,
  memberKey,
  seller
);
```

Category offers can be cancelled using the `cancelCategoryOffer` function.

### P2P Offers

```rust
pub struct P2pOffer {
    // Account tag
    pub tag: Tag,
    // Derivation nonce
    pub nonce: u8,
    // The owner of the p2p offer
    pub owner: Pubkey,
    // The counter party of the offer
    pub counter_party: Pubkey,
    // The domain(s) being traded
    pub domains: Vec<Pubkey>,
    // Domains against which the offer is priced
    pub quotes: Vec<Pubkey>,
    // Amount of SOL (in addition to the quote domains)
    pub amount: i64,
    // Expiry timestamp in seconds
    pub expiry_ts: u64,
}
```

P2P (Peer-to-Peer) Offers enable direct transactions between a buyer and a seller without listing the domain publicly. Sellers can create a P2P offer specifying the buyer's address, the SOL amount, the domain names involved and optionally set an expiration date to the offer.

P2P offers can be created using the `makeP2p` function

```ts
const amount = 10 * LAMPORTS_PER_SOL; // The SOL amount (in lamports) of the P2P offer (can be 0)
const owner = new PublicKey("..."); // The owner of the P2P offer (i.e creator)
const baseDomains: PublicKey[] = []; // The domains the owner wants to sell
const quoteDomains: PublicKey[] = []; // The domains the owner wants to buy (i.e the domains of the counter party)
const endDate: number | undefined = undefined; // The unix timestamp (in seconds) at which the P2P offer expires (optional)
const counterParty = new PublicKey("..."); // The counter party of the P2P offer

const ix = await makeP2p(
  amount,
  owner,
  baseDomains,
  quoteDomains,
  endDate,
  counterParty,
  NAME_OFFERS_ID
);
```

P2P offers can be accepted using the `acceptP2p` function

```ts
const p2pOfferKey = new PublicKey("..."); // The P2P offer key

const ix = await acceptP2p(connection, NAME_OFFERS_ID, p2pOfferKey);
```

P2P offers can be cancelled using `cancelP2p`

## NFT Marketplace

Tokenized domain names can be purchased on NFT marketplaces such as [Magic Eden](https://magiceden.io/marketplace/bonfida), [Tensor](https://www.tensor.trade/trade/bonfida), [Sniper](https://www.sniper.xyz/collection/bonfida) etc...

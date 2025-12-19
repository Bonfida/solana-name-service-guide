# SNS API

⚠️ This API is not meant to replace the blockchain as the source of truth. The blockchain should always be considered as the only source of truth. This API is only a snapshot of the blockchain at a certain point in time and might be stale by a few seconds/minutes.

- The base URL of the API is:

```
https://api.sns.id
```

- The platform enum returned by `sales` endpoint is defined as below:

```javascript
enum PlatformEnum {
    None = 0,
    MagicEden = 1,
    FixedPrice = 2,
    UnsolictedOffer = 3,
    AuctionClaim = 4,
    AuctionPlaceBid = 5,
    Hyperspace = 6,
    SMBMarketplace = 7,
    Solanart = 8,
    Fractal = 9,
    Holaplex = 10,
    DegenApeMarketplace = 11,
    GooseFx = 12,
    SolanartAH =13,
    CoralCube = 14,
    AlphaArt = 15,
    DigitalEyes = 16,
    SolSea = 17,
    ExchangeArt = 18,
    Grape = 19,
    OpenSea = 20,
    Metaplex = 21,
    YAWWW = 22,
    RaribleAH = 23,
    Solvent = 24,
    TiexoT0 = 25,
    TiexoT1 = 26,
    TiexoT2 = 27,
    TiexoT3 = 28,
    TiexoT4 = 29,
    CoralCubeV2 = 30,
    Elixir = 31,
    Tensor = 32,
    GoatSwap = 33,
    Hadeswap = 34,
    AuctionHouse = 35,
    CategoryOffer = 36,
    NightMarket = 37,
    Cardinal = 38,
    MECCSwap = 39,
    SniperMarket = 40,
    Okx = 41,
}
```

- All timestamps are in **seconds**

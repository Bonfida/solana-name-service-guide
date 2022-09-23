# SNS API

⚠️ This API is not meant to replace the blockchain as the source of truth. The blockchain should always be considered as the only source of truth. This API is only a snapshot of the blockchain at a certain point in time and might be stale.

- The base URL of the API is:

```
https://sns-api.bonfida.com
```

- The platform enum returned by `sales` endpoint is defined as below:

```javascript
enum PlatformEnum {
    None = 0,
    MagicEden = 1, // Sale happened on Magic Eden
    FixedPrice = 2, // Sale happened on Bonfida as a fixed price sale
    UnsolictedOffer = 3, // Sale happened on Bonfida as an unsolicited offer
    Auction = 4 // Sale happened on Bonfida as an auction
}
```

- All timestamps are in **seconds**

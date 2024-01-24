## Listings

### Listing Details

This endpoint can be used to retrieve the listing details of a specific domain. The response is a JSON object with the below structure if the domain is listed, or null if the domain is not.

| Key | Type                  | Description                                         |
| --- | --------------------- | --------------------------------------------------- |
| d   | String                | The domain name                                     |
| p   | Float (`f32`)         | The price of the domain                             |
| q   | String                | The token mint of the listing                       |
| a   | Enum (`u8`)           | The availability ID (see `PlatformEnum` definition) |
| l   | Enum (`u8`)           | Language code (see definition below)                |
| up  | Float (`f32`)         | The price in USD                                    |
| e   | Boolean               | Indicates if the domain has an emoji                |
| r   | Boolean               | Indicates if the domain is rare                     |
| do  | Boolean               | Indicates if the domain contains digits only        |
| lo  | Boolean               | Indicates if the domain contains letters only       |
| le  | Integer               | The length of the domain name                       |
| fp  | Boolean               | Indicates if the listing is a fixed price offer     |
| me  | Boolean               | Indicates if the domain is listed on Magic Eden     |
| pa  | Boolean               | Indicates if the domain is a palindrome             |
| ca  | Array (`Vec<String>`) | A list of categories the domain belongs to          |

> Request

```
GET /v2/listings/listing/{domain}
```

> Response

```json
{
  "d": "bonfida.sol",
  "p": 100.0,
  "q": "USDC",
  "a": 2,
  "l": 0,
  "up": 100.0,
  "e": false,
  "r": true,
  "do": false,
  "lo": true,
  "le": 7,
  "fp": true,
  "me": false,
  "pa": false,
  "ca": []
}
```

```rust
pub enum Language {
    English = 0,
    Cyrillic = 1,
    Chinese = 2,
    Japanese = 3,
    Emoji = 4,
    Unauthorized = 5,
    Korean = 6,
    Arabic = 7,
}
```

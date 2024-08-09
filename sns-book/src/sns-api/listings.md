## Listings

### All marketplace listings

This endpoint can be used to retrieve the details of listings across marketplaces such as Sns.id, MagicEden, Tensor, and SolSniper.

The endpoint takes optional params to help filter results.

- `lang` - Language filter. Language struct shared below.
- `palindrome` - Boolean filter for palindromic domains.
- `emoji` - Boolean filter for domains containing emojis.
- `rare` - Boolean filter for rare domains.
- `digits_only` - Boolean filter for domains with only digits.
- `letters_only` - Boolean filter for domains with only letters.
- `min_len` - Integer filter for minimum length of domain names.
- `max_len` - Integer filter for maximum length of domain names.
- `mints` - List of token mints as an array of strings.
- `min_price` - Minimum price filter as a floating point integer.
- `max_price` - Maximum price filter as a floating point integer.
- `start_with` - String filter for domains that start with a specific string.
- `end_with` - String filter for domains that end with a specific string.
- `contain` - String filter ilter for domains that contain a specific string.
- `categories` - List of categories to filter by as an array of strings.
- `page_size` - Number of listings per page (default: 100, max: 100).
- `page` - Page number (default: 1).
- `order_by` - UsdPriceAsc, UsdPriceDesc, DomainAsc, DomainDesc, Random as strings.

> Request

```
POST /v2/listings/listings-v3
```

> Response

```json
{
  "total": 150,
  "data": [
    {
      "domain": "exampledomain",
      "price": 2,
      "quote_mint": "So11111111111111111111111111111111111111112",
      "availability_id": 2,
      "usd_price": 320,
      "metadata": {
        "length": 5,
        "lang": 1,
        "palindrome": false,
        "emoji": false,
        "rare": false,
        "digits_only": false,
        "letters_only": true
      }
    }
  ],
  "page_size": 100,
  "total_pages": 2,
  "page": 1
}
```

### Listing Details

This endpoint can be used to retrieve the listing details of a specific domain. The response is a JSON object with the below structure if the domain is listed, or null if the domain is not.

| Key | Type                  | Description                                         |
| --- | --------------------- | --------------------------------------------------- |
| d   | String                | The domain name                                     |
| p   | Float (`f32`)         | The price of the domain                             |
| q   | String                | The token mint of the listing (i.e the currency)    |
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

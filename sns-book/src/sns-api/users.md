## Users

### Domains Owned

This endpoint can be used to retrieve the domains owned by a list of user public keys. You may include up to 20 public keys in a comma seperated list.

> Request

```
GET /v2/user/domains/{pubkeys}
```

> Response

```json
{
  "FMmaHPDL47V1gXsfh9WjgAT7Er3dfDvarQubTU1Jxc1r": ["03800", "best-intern"],
  "3f9fRjLaDSDVxd26xMEm4WuSXv62cGt5qVfEVGwMfTz6": ["00378", "02112", "11441"]
}
```

### User Listings

This endpoint can be used to retrieve the domains of a user and their listing details. Please see the`PlatformEnum` definiton for details on `availability id`.

> Request

```
GET /v2/user/listings/{pubkey}
```

> Response

```json
[
  {
    "domain": "00378",
    "availability_id": 0,
    "price": null,
    "quote_mint": "So11111111111111111111111111111111111111112",
    "usd_price": null,
    "categories": ["100k-club"],
    "last_activity": {
      "price": 0.18,
      "quote_mint": "So11111111111111111111111111111111111111112",
      "usd_price": 18.4365
    }
  },
  {
    "domain": "02112",
    "availability_id": 2,
    "price": 10.0,
    "quote_mint": "So11111111111111111111111111111111111111112",
    "usd_price": 810.5181,
    "categories": ["100k-club"],
    "last_activity": {
      "price": 0.25,
      "quote_mint": "So11111111111111111111111111111111111111112",
      "usd_price": 19.401249
    }
  }
]
```

### Domains and Categories

This endpoint can be used to retrieve the list of domains owned by a user, as well as their corresponding categories.

> Request

```
GET /v2/user/category-domains/{pubkey}
```

> Response

```json
[
  { "domain_name": "00378", "category_name": "100k-club" },
  { "domain_name": "3231", "category_name": "10k-club" }
]
```

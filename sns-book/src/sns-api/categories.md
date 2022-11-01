## Categories

### Get the list of categories

This endpoint can be used to retrieve the list of all categories.

> Request

```
GET /categories/list
```

> Response

```json
{
  "success": true,
  "result": [
    "english-adjectives",
    "double-emoji"
    // ...
  ]
}
```

### Get the domains of a category

This endpoint can be used to retrieve the list of domains of a category.

> Request

```
GET /categories/list/{category}
```

> Response

```json
{
  "success": true,
  "result": [
    "qatar",
    "uganda"
    // ...
  ]
}
```

### Get categories statistics

This endpoint returns stats for all the categories.

> Request

```
GET /categories/stats?start_time={start_time}&end_time={end_time}
```

> Response

```json
{
  "success": true,
  "result": [
    {
      "category_name": "0x999-club",
      "min_sale": 7.8846874,
      "max_sale": 80.0,
      "avg_price": 43.94234371185303,
      "volume": 87.88469,
      "owners": 1,
      "supply": 2
    }
    // ...
  ]
}
```

### Get statistics for a category

This endpoint returns stats for a given category.

> Request

```
GET /categories/stats/{category}?start_time={start_time}&end_time={end_time}
```

> Response

```json
{
  "success": true,
  "result": [
    {
      "min_sale": 7.8846874,
      "max_sale": 80.0,
      "avg_price": 43.94234371185303,
      "volume": 87.88469,
      "owners": 1,
      "supply": 2
    }
  ]
}
```

### Get floors

This endpoint returns the current floors for all categories. Floor prices are given in USD value.

> Request

```
GET /categories/floors
```

> Response

```json
{
  "success": true,
  "result": {
    "0x999-club": 21.839999628067016,
    "4-letter-dictionary": 101.39999999999999
    // ...
  }
}
```

### Get floor for a category

This endpoint returns the current floor for a given category. Floor prices are given in USD value.

> Request

```
GET /categories/floors/{category}
```

> Response

```json
{
  "success": true,
  "result": 21.839999628067016
}
```

### Get supply

This endpoint can be used to retrieve the number of registered and unregistered domains of a category.

> Request

```
GET /categories/supply
```

> Response

```json
{
  "success": true,
  "result": {
    "0x999-club": {
      "total": 1000,
      "registered": 38,
      "unregistered": 962
    }
    // ...
  }
}
```

### Get top categories by volume

This endpoint returns the top 10 categories by volume between `start_time` and `end_time`.

> Request

```
GET /categories/top?start_time={start_time}&end_time={end_time}
```

> Response

```json
{
  "success": true,
  "result": [
    {
      "category_name": "10k-club",
      "volume": 177737.16
    }
  ]
}
```

## Get owners

> Request

This endpoint returns the public keys owning domains for a given category and the number of domains they own.

```
GET /categories/owners/{category}
```

> Response

```json
{
  "success": true,
  "result": [
    {
      "owner_key": "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix",
      "nb_domains": 38
    }
  ]
}
```

## Sales

### Last

This endpoint can be used to retrieve the list of recent sales. The max `limit` parameter is 500.

> Request

```
GET /sales/last?limit={limit}
```

> Response

```json
{
  "success": true,
  "result": [
    {
      "unix_timestamp": 1663824910,
      "slot": 151782075,
      "domain_name": "wagb👌",
      "domain_key": "FqRocnogXTAwTnhYxRc4BA3uFkAChsDefed6nVWeD1Xe",
      "domain_auction_key": "GQJyiqBXq2HWnFXUWcp3pDmBYZEw3CjiYbkUJoZC6qT2",
      "domain_token_mint": "ESPZfWYWQZ3fJaxq7GjzkCzXKJPRMfnKc1dhkVQBZyt2",
      "bidder_key": "TG41WLDXx4ofZ52up4pEKQcDj1zQ4oX9LUop5qnUwQr",
      "price": 1.55,
      "quote_mint": "So11111111111111111111111111111111111111112",
      "usd_price": 47.999626,
      "tx_signature": "2WcrNobBtLrarFNrakkMad2eyVzfBTzCnHo2cJYgWdoUHmH9eMqZe9SzJr53m1A4BqPzmXL5WcExc4t4r5DmMTC3",
      "platform_id": 1,
      "successful": true
    }
    // ...
  ]
}
```

### Registrations

This endpoint can be used to retrieve registrations between `end_time` and `start_time`. The max `limit` is 500.

> Request

```
GET /sales/registrations?limit={limit}&end_time={end_time}&start_time={end_time}
```

> Response

```json
{
  "success": true,
  "result": [
    {
      "unix_timestamp": 1663789595,
      "slot": 151721528,
      "tx_signature": "2D9VPjN93j7YTx13oHN9sL2RDHbytLMfNmxTCBc8a57faomn4e2iF2QyUU1DLfdA9FYEJq1SzXmaC8p9FntLckUL",
      "domain_name": "meggadao",
      "domain_key": "FoidaZVWPYNCgRkthdJqnSQ82x7SLkSpBAypR7RVtFNU",
      "domain_auction_key": "HmGENkrhkA7ekmj9kKni4CJLJyifjzohPAV1wWTWuQFX",
      "domain_token_mint": "ExankJNcWwJoS4ZYe5Xuw8r7ioqAcg5XkbzWT6NJhsiA",
      "price": 48.769577,
      "quote_mint": "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp",
      "usd_price": 20.184021
    }
  ]
}
```

### Leaderboard

This endpoint returns the top 100 sales ever.

> Request

```
GET /sales/leaderboard
```

> Response

```json
{
  "success": true,
  "result": [
    {
      "domain_name": "53",
      "usd_price": 15999.0
    }
    // ...
  ]
}
```

## Domains

### History

This endpoint can be used to retrieve the transaction history for all registered domains. Since the response payload will be large, the below optional query parameters can be passed.

`limit` - This is the number of records per response up to 200. 200 is also the default if no limit parameter is passed.

`start_time` - The start in unix timestamp from when the domain transaction records should be obtained.

`end_time` - The end in unix timestamp to when the domain transaction records should be obtained.

`last_token` - This token is used to fetch the next set of responses and is recieved from the API response. After the initial API call, you can pass this as a parameter for further responses.

```
GET v2/domains/history?limit={limit}&start_time={start_time}&end_time={end_time}&last_token={last_token}
```

> Response

```json
{
  "data": [
    {
      "operation": 1,
      "unix_timestamp": 1622592000,
      "tx_signature": "27EjmB4NdsRKMNkeYeF4rva...",
      "domain_key": "4cQ3zUeardJweGTnk...",
      "pre_tx_owner": "5fEPywJMxeP2HBo7JyBUv1G...",
      "post_tx_owner": "CUcYT9ZoBXET88o...",
      "transaction_type": 1,
      "usd_price": 152,
      "price": 1,
      "quote_mint": "So11111111111111111111111111111111111111112"
    }
  ],
  "last_token": "1622592000:abcdef1234567890:domain1"
}
```

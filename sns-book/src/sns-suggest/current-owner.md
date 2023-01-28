## Current owner

The current owner endpoint will return the following information:

- Domain name (`String`)
- Domain key (`String`)
- Domain token mint: The mint of the NFT representing the domain if it is tokenized (`String`)
- Domain auction key: The key of the auction state associated to the domain (`String`)
- Owner key: The key of the current owner of the domain (`String`)
- Availability ID: The enum described [here](/sns-api/index.html) (`Option<i16>`)
- Price: The price of the domain if the domain is available (`Option<f32>`)
- Quote mint: The mint in which the domain is quoted if it is available
- Fixed price key: The key of current fixed price offer if it exists (`Option<String>`)

### Search

To search for domains that match a certain keywaord (e.g `00`):

```
curl \
  -X POST 'https://sns-suggest-proxy.bonfida.com' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "q": "00" <- You keywords
  }'

```

```json
{
  "hits": [
    {
      "domain_name": "00",
      "id": "00",
      "domain_key": "4oZe4sxw1cSbm4KoiukMs6FSG6zW8rzKgkLDPQd5Gk6Q",
      "domain_token_mint": "HWDX6pDdb3mp2223PzLccezouex1m4LLEw9GTjV85Rkx",
      "domain_auction_key": "ctPQ35SSXvti38NmNYmwy9Lk4EtyxHMZViVNSZNTPUo",
      "owner_key": "5Aw5mkykrqMj8tbqzKVrgBW79w26ha1ELe3zj6ZKYz4b",
      "availability_id": null,
      "price": null,
      "quote_mint": null,
      "fixed_price_offer_account": null
    }
    //...
  ],
  "query": "",
  "processingTimeMs": 0,
  "limit": 20,
  "offset": 0,
  "estimatedTotalHits": 1000
}
```

The search feature is **typo tolerent**

### Simple UI integration

Below is a simple React hook example

```ts
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export interface Item {
  domain_name: string;
  id: string;
  domain_key: string;
  domain_token_mint: string;
  domain_auction_key: string;
  owner_key: string | null | undefined;
  availability_id: number | null | undefined;
  price: number | null | undefined;
  quote_mint: string | null | undefined;
  fixed_price_offer_account: string | null | undefined;
}

export interface Result {
  hits: Item[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
}

const URL = "https://sns-suggest-proxy.bonfida.com";

export const useDomainAutoSuggest = (domain: string) => {
  const [result, setResult] = useState<Item[] | undefined>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      const payload = { q: domain };

      const { data }: { data: Result } = await axios.post(URL, payload, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (mounted.current) {
        setResult(data.hits);
      }

      return () => (mounted.current = false);
    };
    fn().catch(console.error);
  }, [domain]);

  return result;
};
```

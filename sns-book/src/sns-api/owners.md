## Owners

### Distribution

This endpoint can be used to retrieve the domains distribution (includes escrow wallets)

```
GET /owners/distribution
```

> Response

```json
{
  "success": true,
  "result": [
    { "nb_owners": 1, "nb_domains": 41896 }
    // ...
  ]
}
```

This endpoint can be used to retrieve the domains distribution (excludes escrow wallets)

```
GET /owners/distribution-exclude-escrows
```

> Response

```json
{
  "success": true,
  "result": [
    { "nb_owners": 1, "nb_domains": 41896 }
    // ...
  ]
}
```

### Domains for owner

This endpoint can be used to retrieve the domain owned by a public key

```
GET /owners/{owner_key}/domains
```

> Response

```json
{
  "success": true,
  "result": [
    "pharmacy",
    "softball",
    "travelagent"
    // ...
  ]
}
```

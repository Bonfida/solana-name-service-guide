## Images

Domain images can vary based on the rarity of a domain, if a domain contains an emoji character, or if a user has purchased a custom domain background during one of our limited time ecosystem artist collaborations.

More information about images can be found here: [Media Kit](/domain-name/media-kit.md)

### Base URL

Please note the base URL for images differs from other endpoints.

- The base URL of the API is:

```
https://image-api.bonfida.com
```

API response times can vary based on if a request for an image has been previously made. The image is generated upon the first request and then cached, greatly reducing subsequent response times.

### Get a list of domain images

This endpoint can be used to retrieve images for a list of domains.

> Request

```
GET /image?domain=foo&domain=bar
```

> Response

```json
{
  "result": [
    { "domain": "foo", "image": "https://..." },
    { "domain": "bar", "image": "https://..." }
    // ...
  ]
}
```

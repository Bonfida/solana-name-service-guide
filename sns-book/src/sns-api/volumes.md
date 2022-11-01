## Volumes

### Secondary sales volume

This endpoint can be used to retrieve volumes for secondary sales accross all market places

> Request

```
GET /sales/volumes/sales?start_time={start_time}&end_time={end_time}
```

> Response

```json
{
  "success": true,
  "result": [
    { "day": 1667174400, "volume": 115.98516 },
    { "day": 1667088000, "volume": 658.9297 }
  ]
}
```

### Direct registration volume

This endpoint can be used to retrieve direct registrations volume

> Request

```
GET /sales/volumes/registrations?start_time={start_time}&end_time={end_time}
```

> Response

```json
{
  "success": true,
  "result": [
    { "day": 1667174400, "volume": 115.98516 },
    { "day": 1667088000, "volume": 658.9297 }
  ]
}
```

### Aggregated volume

This endpoint can be used to retrieve aggregated volume (secondary sales + direct registrations)

> Request

```
GET /sales/volumes/all?start_time={start_time}&end_time={end_time}
```

> Response

```json
{
  "success": true,
  "result": [
    { "day": 1667174400, "volume": 115.98516 },
    { "day": 1667088000, "volume": 658.9297 }
  ]
}
```

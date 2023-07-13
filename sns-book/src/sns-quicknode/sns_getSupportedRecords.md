# `sns_getSupportedRecords`

Returns a list of all the currently supported record types.

## Parameters

None

## Result

The result will be an RPCResponse JSON object with field:

- **result** `string[]`: The list of currently supported record types.

## Example

```json
{
  "jsonrpc": "2.0",
  "method": "sns_getSupportedRecords",
  "params": [],
  "id": 42
}
```

```json
{
  "jsonrpc": "2.0",
  "result": [
    "IPFS",
    "ARWV",
    "SOL",
    "ETH",
    "BTC",
    "LTC",
    "DOGE",
    "email",
    "url",
    "discord",
    "github",
    "reddit",
    "twitter",
    "telegram",
    "pic",
    "SHDW",
    "POINT",
    "BSC",
    "INJ",
    "backpack"
  ],
  "id": 42
}
```

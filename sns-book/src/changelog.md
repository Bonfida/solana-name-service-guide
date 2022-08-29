# Changelog

- `0.1.50`: add `POINT` record
- `0.1.41`: add `getAllRegisteredDomains`
- `0.1.40`: fix `performReverseLookupBatch`
- `0.1.39`: add `Record` `enum` and records getter functions
- `0.1.38`: add `getFavoriteDomain`, `getDomainKey` and `getAllDomains`
- In version `0.1.26` the signature of `NameRegistryState.retrieve` changed, it is now returning an object of type `{ registry: NameRegistryState, nftOwner: PublicKey | undefined }`

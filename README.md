# Data Marketplace search indexer

Service for fetching data from sources and push to Algolia index.

## Getting started

### Prereq

- `npm install -g azurite`

### Run the Azure function locally

1. Set development storage to true in local.settings.json `"AzureWebJobsStorage": "UseDevelopmentStorage=true"`
2. Start scripts

```
  npm run azurite
  npm run watch
  npm run start
```

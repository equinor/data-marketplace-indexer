import { Settings } from '@algolia/client-search'

export const indexSettings: Settings = {
  searchableAttributes: ['name', 'excerpt', 'description', 'provider', 'owner', 'technicalSteward', 'dataOfficeAdmin'],
  attributesToSnippet: ['excerpt:30', 'description:30'],
  attributesForFaceting: ['community', 'dataOfficeAdmin', 'dataSteward', 'owner', 'provider', 'technicalSteward'],
  attributeForDistinct: 'id',
  distinct: 1,
  advancedSyntax: true,
  ranking: ['desc(name)', 'typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
}

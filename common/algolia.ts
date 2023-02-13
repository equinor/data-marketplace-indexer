import algoliasearch, { SearchIndex } from 'algoliasearch'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import { getAlgoliaApiKey, getAlgoliaAppId } from './env'
import type { CollibraAsset } from './types'

const algoliaSearchCurried = (appId: string) => (apiKey: string) => algoliasearch(appId, apiKey)

// Temp index name
// Init one particular index
// TODO: If we are using multiple indexes, this needs to be refactored
type InitType = (indexName: string) => E.Either<string, SearchIndex>
const init: InitType = (indexName) => {
  console.log('Init')
  return pipe(
    getAlgoliaAppId(),
    E.map(algoliaSearchCurried),
    E.chain((algoliaSearch) => pipe(getAlgoliaApiKey(), E.map(algoliaSearch))),
    E.map((client) => client.initIndex(indexName)),
  )
}

// Push to Algolia index
type UpdateIndexType = (data: readonly CollibraAsset[]) => (index: SearchIndex) => TE.TaskEither<Error, SearchIndex>
const updateIndex: UpdateIndexType = (data) => (index) =>
  pipe(
    TE.tryCatch(
      () => index.saveObjects(data),
      (error) => new Error(`Unable to update index. Error message: ${JSON.stringify(error)}`),
    ),
    //TE.map((response) => `Number of objects updated: ${response.objectIDs.length}`),
    TE.map(() => index),
  )

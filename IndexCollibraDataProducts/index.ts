import { AzureFunction, Context } from '@azure/functions'
import algoliasearch from 'algoliasearch'
import DotenvAzure from 'dotenv-azure'
//import * as E from 'fp-ts/lib/Either'
//import { ap } from 'fp-ts/lib/Identity'
//import * as T from 'fp-ts/lib/Task'
//import * as TE from 'fp-ts/lib/TaskEither'
//import { pipe, flow } from 'fp-ts/lib/function'
//import { update, generateIndexName } from '../common/algolia'
//import { getEnvironment } from '../common/env'

import { indexSettings } from './src/indexSettings'
import { /* fetchData, */ mockData } from './src/mockProducts'

// const indexIdentifier = 'Collibra'

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })
  const logger = context.log

  const indexName = 'test_Collibra'
  // const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)))
  logger('Index name', indexName)

  const appId = process.env.ALGOLIA_APP_ID || ''
  const apiKey = process.env.ALGOLIA_API_KEY || ''
  logger('Credentials', appId, apiKey)
  console.log('Creating client')
  const client = algoliasearch(appId, apiKey)
  const index = client.initIndex(indexName)
  console.log('inited index')
  index.setSettings(indexSettings)
  console.log('added index settings')
  await index.saveObjects(mockData)
  console.log('added data')
  logger('Updating done!')
  //const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))

  /*  pipe(
    fetchData(),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    T.map(E.fold(console.error, console.log)),
  ) */
}

export default httpTrigger

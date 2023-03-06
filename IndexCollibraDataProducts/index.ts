import { AzureFunction, Context } from '@azure/functions'
import { Asset } from '@equinor/data-marketplace-models'
import { HttpStatusCode } from 'axios'
import DotenvAzure from 'dotenv-azure'
import * as A from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import { ap } from 'fp-ts/lib/Identity'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe, flow } from 'fp-ts/lib/function'

import { update, generateIndexName } from '../common/algolia'
import { assetToIndexable } from '../common/assetToIndexable'
import { getEnvironment } from '../common/env'
import { toNetError } from '../common/net/toNetError'
import { IndexableAsset } from '../common/types'

import { fetchData } from './src/fetchData'
import { indexSettings } from './src/indexSettings'

const indexIdentifier = 'Collibra'

const getAuthValue = (ctx: Context): TE.TaskEither<string, string> =>
  pipe(E.fromNullable('No authorization header present in request')(ctx.req?.headers.authorization), TE.fromEither)

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })

  const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)))
  const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))

  const res = await pipe(
    getAuthValue(context),
    TE.mapLeft(toNetError(HttpStatusCode.Unauthorized)),
    TE.map(fetchData),
    TE.flatten,
    TE.map(A.map<Asset, IndexableAsset>(assetToIndexable([]))),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.mapLeft(toNetError(HttpStatusCode.InternalServerError)),
    TE.match(
      (err) =>
        new Response(JSON.stringify({ error: err.message }), {
          status: err.status,
          headers: new Headers({ 'content-type': 'application/json' }),
        }),
      () => new Response(null, { status: HttpStatusCode.NoContent }),
    ),
  )()

  context.res = res
}

export default httpTrigger

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

import { fetchData as getAssets } from './src/fetchData'
import { getAssetMaintainers } from './src/getAssetMaintainers'
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
    TE.bindTo('authorization'),
    TE.mapLeft(toNetError(HttpStatusCode.Unauthorized)),
    TE.bind('assets', ({ authorization }) => getAssets(authorization)),
    TE.bind('maintainers', ({ authorization, assets }) =>
      pipe(A.map(getAssetMaintainers(authorization))(assets), TE.sequenceArray),
    ),
    TE.map(({ assets, maintainers }) =>
      A.mapWithIndex<Asset, IndexableAsset>((i, asset) => assetToIndexable(maintainers[i])(asset))(assets),
    ),
    TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
    TE.flatten,
    TE.mapLeft(toNetError(HttpStatusCode.InternalServerError)),
    TE.match(
      (err) => ({
        status: err.status,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: err.message }),
      }),
      (message) => ({
        status: HttpStatusCode.Ok,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message }),
      }),
    ),
  )()

  if (res.status >= 400) {
    context.log.error(JSON.parse(res.body).error)
  } else {
    context.log.info(JSON.parse(res.body).message)
  }

  context.res = {
    status: res.status,
    headers: {
      'content-type': 'application/json',
    },
    body: res.body,
  }
}

export default httpTrigger

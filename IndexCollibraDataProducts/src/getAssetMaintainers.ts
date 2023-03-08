import { Asset, Maintainer } from '@equinor/data-marketplace-models'
import { HttpStatusCode } from 'axios'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import { Get } from '../../common/net/Get'
import { getAdapterServiceClient } from '../../common/net/adapterServiceClient'
import { toNetError } from '../../common/net/toNetError'

export const getAssetMaintainers = (authorization: string) => (asset: Asset) =>
  pipe(
    getAdapterServiceClient(),
    E.mapLeft(toNetError(HttpStatusCode.InternalServerError)),
    TE.fromEither,
    TE.chain(Get<Maintainer[]>(`/assets/${encodeURIComponent(asset.id)}/maintainers`)({ headers: { authorization } })),
  )

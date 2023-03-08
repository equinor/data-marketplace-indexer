import type { Asset } from '@equinor/data-marketplace-models'
import { HttpStatusCode } from 'axios'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import { Get } from '../../common/net/Get'
import { getAdapterServiceClient } from '../../common/net/adapterServiceClient'
import { toNetError, type NetError } from '../../common/net/toNetError'

export const fetchData = (authorization: string): TE.TaskEither<NetError, Asset[]> =>
  pipe(
    getAdapterServiceClient(),
    E.mapLeft(toNetError(HttpStatusCode.InternalServerError)),
    TE.fromEither,
    TE.chain(Get<Asset[]>('/assets')({ headers: { authorization } })),
    TE.mapLeft(toNetError(HttpStatusCode.InternalServerError)),
  )

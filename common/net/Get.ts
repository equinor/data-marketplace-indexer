import { AxiosRequestConfig, type Axios } from 'axios'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import { toNetError } from './toNetError'

export const Get =
  <T = unknown>(path: string) =>
  (opts?: AxiosRequestConfig) =>
  (client: Axios) =>
    pipe(
      TE.tryCatch(() => client.get<T>(path, opts), toNetError()),
      TE.map((res) => res.data),
    )

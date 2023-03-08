import { AxiosRequestConfig, type Axios } from 'axios'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

export const Get =
  <T = unknown>(path: string) =>
  (opts?: AxiosRequestConfig) =>
  (client: Axios) =>
    pipe(
      TE.tryCatch(() => client.get<T>(path, opts), E.toError),
      TE.map((res) => res.data),
    )

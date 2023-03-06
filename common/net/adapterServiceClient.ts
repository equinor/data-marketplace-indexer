import axios from 'axios'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'

import { getAdapterServiceAppKey, getAdapterServiceBaseURL } from '../env'

const makeAdapterServiceClient = (appKey: string) => (baseURL: string) =>
  axios.create({
    baseURL,
    params: { code: appKey },
  })

export const getAdapterServiceClient = flow(
  getAdapterServiceBaseURL,
  E.bindTo('baseURL'),
  E.bind('appKey', getAdapterServiceAppKey),
  E.map(({ appKey, baseURL }) => makeAdapterServiceClient(appKey)(`${baseURL}/api`)),
)

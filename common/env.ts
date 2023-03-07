import * as E from 'fp-ts/lib/Either'

import { GetProcessEnvType } from './types'

export const getAlgoliaAppId: GetProcessEnvType = () =>
  E.fromNullable('Unable to find app id')(process.env.ALGOLIA_APP_ID)

export const getAlgoliaApiKey: GetProcessEnvType = () =>
  E.fromNullable('Unable to find API key')(process.env.ALGOLIA_API_KEY)

export const getAdapterServiceBaseURL: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Adapter Service base URL')(process.env.ADAPTER_SERVICE_BASE_URL)

export const getAdapterServiceAppKey: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Adapter Service app key')(process.env.ADAPTER_SERVICE_APP_KEY)

export const getEnvironment: GetProcessEnvType = () => E.fromNullable('Unable to find environment')(process.env.ENV)

import { AzureFunction, Context } from '@azure/functions'
import DotenvAzure from 'dotenv-azure'
import { pipe } from 'fp-ts/lib/function'

import { mockData } from './src/mockProducts'

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })
  const logger = context.log

  const getApprovedAssets = mockData

  pipe(getApprovedAssets)
  logger('Http trigger ran')
}

export default httpTrigger

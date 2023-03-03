import { AzureFunction, Context, Timer } from '@azure/functions'
import axios from 'axios'
import DotenvAzure from 'dotenv-azure'

const timerTrigger: AzureFunction = async function (context: Context, myTimer: Timer): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })
  const timeStamp = new Date().toISOString()

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  const indexerBaseUrl = process.env.INDEXER_BASE_URL
  /* const indexerServiceAppKey = process.env.INDEXER_SERVICE_APP_KEY
  console.log('The values', indexerBaseUrl, indexerServiceAppKey) */

  const url = `${indexerBaseUrl}/api/index-collibra`

  await axios.post(url)
  context.log('Timer trigger function ran!', timeStamp)
}

export default timerTrigger

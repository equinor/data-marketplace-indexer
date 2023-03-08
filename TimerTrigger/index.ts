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

  const buf = Buffer.from(`${process.env.COLLIBRA_SYS_USER}:${process.env.COLLIBRA_SYS_PASS}`)

  try {
    await axios.get(`${process.env.INDEXER_BASE_URL}/api/index-collibra`, {
      headers: { authorization: `Basic ${buf.toString('base64')}` },
      params: { code: process.env.ADAPTER_SERVICE_APP_KEY ?? '' },
    })

    context.log('TimerTrigger ran successfully', timeStamp)
  } catch (error) {
    context.log.error('TimerTrigger failed', error)
  }
}

export default timerTrigger

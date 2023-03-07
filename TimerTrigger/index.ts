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

  await axios.post('/api/index-collibra', {
    headers: {
      authorization: `Basic ${buf.toString('base64')}`,
    },
  })
  context.log('Timer trigger function ran!', timeStamp)
}

export default timerTrigger

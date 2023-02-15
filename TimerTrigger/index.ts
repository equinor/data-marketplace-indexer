import { AzureFunction, Context, Timer } from '@azure/functions'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const timerTrigger: AzureFunction = async function (context: Context, myTimer: Timer): Promise<void> {
  const timeStamp = new Date().toISOString()

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  // @TODO Fix this, doesn't work
  const url = 'http://localhost:7071/api/indexCollibraDataProducts'

  await axios.post(url)
  context.log('Timer trigger function ran!', timeStamp)
}

export default timerTrigger

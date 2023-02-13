import { AzureFunction, Context } from '@azure/functions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toISOString()

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  context.log('Timer trigger function ran!', timeStamp)
}

export default timerTrigger

import { AzureFunction, Context } from '@azure/functions'

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  context.log('Http trigger ran')
}

export default httpTrigger

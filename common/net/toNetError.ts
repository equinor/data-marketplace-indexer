import { isAxiosError } from 'axios'

export class NetError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export const toNetError =
  (status?: number) =>
  (err: unknown): NetError => {
    if (isAxiosError(err)) {
      return new NetError(err.message, status || (err.status ?? 500))
    }

    return new NetError(err instanceof Error ? err.message : String(err), status ?? 500)
  }

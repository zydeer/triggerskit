import { type Result, TriggersError } from '../types'

export const ok = <T>(data: T): Result<T> => ({ data, error: null })

export const err = (error: TriggersError): Result<never> => ({
  data: null,
  error,
})

export const fail = (e: unknown): Result<never> => ({
  data: null,
  error:
    e instanceof TriggersError
      ? e
      : new TriggersError(e instanceof Error ? e.message : 'Unknown error'),
})

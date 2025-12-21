export interface TKError<T = unknown> {
  /** Error message */
  message: string
  /** Error code for programmatic handling */
  code?: string
  /** Additional error details */
  details?: T
}

export function error<T = unknown>(
  message: string,
  details?: T,
  code?: string,
): TKError<T> {
  return {
    message,
    ...(code && { code }),
    ...(details !== undefined && { details }),
  }
}

export function toError(e: unknown): TKError {
  if (isTKError(e)) return e
  if (e instanceof Error) return error(e.message)
  return error('Unknown error')
}

export function isTKError(value: unknown): value is TKError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as TKError).message === 'string'
  )
}

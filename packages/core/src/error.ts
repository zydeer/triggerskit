/**
 * Error object for all TriggersKit operations.
 * Uses plain objects instead of Error class for cleaner serialization and handling.
 */
export interface TKError<T = unknown> {
  /** Error message */
  message: string
  /** Error code for programmatic handling */
  code?: string
  /** Additional error details */
  details?: T
}

/** Create a TKError object */
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

/** Create error from unknown value */
export function toError(e: unknown): TKError {
  if (isTKError(e)) return e
  if (e instanceof Error) return error(e.message)
  return error('Unknown error')
}

/** Type guard to check if value is a TKError */
export function isTKError(value: unknown): value is TKError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as TKError).message === 'string'
  )
}

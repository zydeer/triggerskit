import type { ZodType } from 'zod'

export interface TKError<T = unknown> {
  message: string
  details?: T
}

export function isTKError(value: unknown): value is TKError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as TKError).message === 'string'
  )
}

export function toError(e: unknown): TKError {
  if (isTKError(e)) return e
  if (e instanceof Error) return { message: e.message }
  return { message: 'Unknown error' }
}

export class TriggersError extends Error {
  readonly details?: unknown

  constructor(message: string, details?: unknown) {
    super(message)
    this.name = 'TriggersError'
    this.details = details
  }
}

export type Result<T, E = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: TKError<E> }

export const ok = <T>(data: T): Result<T> => ({ ok: true, data })

export const err = <E = unknown>(e: TKError<E>): Result<never, E> => ({
  ok: false,
  error: e,
})

export const fail = (e: unknown): Result<never> => ({
  ok: false,
  error: toError(e),
})

export function parse<T>(schema: ZodType<T>, data: unknown): Result<T> {
  const result = schema.safeParse(data)

  if (result.success) {
    return ok(result.data)
  }

  const issues = result.error.issues.map((i) => {
    const path = i.path.length > 0 ? i.path.join('.') : 'root'
    return `${path}: ${i.message}`
  })

  return err({
    message: `Validation failed: ${issues.join('; ')}`,
    details: result.error.issues,
  })
}

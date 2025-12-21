import type { ZodType } from 'zod'
import { error, type TKError, toError } from './error'

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

  return err(
    error(
      `Validation failed: ${issues.join('; ')}`,
      result.error.issues,
      'VALIDATION_ERROR',
    ),
  )
}

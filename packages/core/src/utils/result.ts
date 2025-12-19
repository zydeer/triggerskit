import type { ZodType } from 'zod'
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

export function safeParse<T>(schema: ZodType<T>, data: unknown): Result<T> {
  const result = schema.safeParse(data)

  if (result.success) {
    return ok(result.data)
  }

  const error = result.error
  const issues = error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join('.') : 'root'
    return `${path}: ${issue.message}`
  })
  const message = `Validation failed: ${issues.join('; ')}`

  return err(new TriggersError(message, { issues: error.issues }))
}

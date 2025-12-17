export type ErrorJSON<T = unknown> = { message: string; details: T | undefined }

export class TriggersError<T = unknown> extends Error {
  readonly details: T | undefined

  constructor(message: string, details?: T) {
    super(message)
    this.name = 'TriggersError'
    this.details = details
  }

  toJSON(): ErrorJSON<T> {
    return { message: this.message, details: this.details }
  }
}

export type Result<T> =
  | { data: T; error: null }
  | { data: null; error: TriggersError }

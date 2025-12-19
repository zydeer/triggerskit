import type { Result } from './result'

export type WebhookContext = {
  headers: Headers
  body: unknown
  url: URL
  request: Request
}

export type WebhookDetector<TData = unknown> = {
  detect: (context: WebhookContext) => boolean | Promise<boolean>
  handleWebhook: (request: Request) => Promise<Result<TData>>
}

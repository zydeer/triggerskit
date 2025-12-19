import type { Result } from './result'
import type { WebhookContext, WebhookDetector } from './webhook'

// ============================================================================
// Request Types
// ============================================================================

/**
 * A generic request function for making API calls.
 */
export type RequestFn = <T = unknown>(
  path: string,
  init?: RequestInit,
) => Promise<T>

// ============================================================================
// Provider Types
// ============================================================================

/**
 * Context passed to action functions.
 * Can be extended with provider-specific properties.
 */
export type ActionContext<TExtra = object> = { request: RequestFn } & TExtra

/**
 * Base interface for all provider instances.
 * Providers must implement this interface for consistent API.
 *
 * @template TName - Literal type for provider name (e.g., 'telegram', 'discord')
 * @template TActions - Record of available action methods
 * @template TWebhookData - Type of data returned from webhook handling
 */
export type ProviderInstance<
  TName extends string = string,
  TActions extends Record<string, (...args: never[]) => unknown> = Record<
    string,
    (...args: never[]) => unknown
  >,
  TWebhookData = unknown,
> = {
  /** Unique provider identifier */
  readonly provider: TName
  /** Provider action methods */
  readonly actions: TActions
  /** Raw request function for direct API access */
  readonly request: RequestFn
  /** Webhook detector for auto-routing (optional) */
  readonly detector?: WebhookDetector<TWebhookData>
}

// ============================================================================
// Webhook Handling
// ============================================================================

/**
 * Data returned from a successful webhook handle.
 *
 * @template TProvider - The provider name type
 * @template TData - The webhook data type
 */
export type WebhookHandleData<
  TProvider extends string = string,
  TData = unknown,
> = {
  /** The provider that handled this webhook */
  provider: TProvider
  /** The parsed webhook data */
  data: TData
}

/**
 * Result from the unified webhook handler.
 *
 * @template TProvider - Union of possible provider names
 * @template TData - Type of webhook data
 */
export type WebhookHandleResult<
  TProvider extends string = string,
  TData = unknown,
> = Result<WebhookHandleData<TProvider, TData>>

/**
 * Context passed to webhook detection functions.
 */
export type { WebhookContext }

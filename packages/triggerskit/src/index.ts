import type {
  OAuthProvider,
  Provider,
  WebhookContext,
  WebhookPayload,
} from '@triggerskit/core/provider'
import type { Result } from '@triggerskit/core/result'

export type Providers = Record<string, Provider | OAuthProvider>

export type WebhookResult<T extends Providers> = {
  [K in keyof T & string]: {
    provider: K
    payload: WebhookPayload<T[K]>
  }
}[keyof T & string]

export type KitHandlerPayload<P extends Providers> = {
  providers: P
}

export type KitHandler<T extends Providers = Providers, R = void> = (
  payload: KitHandlerPayload<T>,
) => R

export type Kit<T extends Providers, R> = T & {
  handleWebhook(request: Request): Promise<Result<WebhookResult<T>>>
  handle(handler: KitHandler<T, R>): R
  handleOAuth(
    provider: string | undefined,
    userId: string | undefined,
  ): Promise<any>
  handleOAuthCallback(
    provider: string | undefined,
    userId: string | undefined,
    request: Request,
    onSuccess: () => any,
  ): Promise<any>
}

export function triggers<T extends Providers, R>(config: {
  providers: T
}): Kit<T, R> {
  return {
    ...config.providers,
    handleWebhook: createWebhookHandler(config.providers),
    handle: createHandler(config.providers),
    handleOAuth: createOAuthHandler(config.providers),
    handleOAuthCallback: createOAuthCallbackHandler(config.providers),
  }
}

function createWebhookHandler<T extends Providers>(providers: T) {
  return async (request: Request): Promise<Result<WebhookResult<T>>> => {
    const clonedRequest = request.clone()

    let body: unknown = null
    try {
      body = await clonedRequest.json()
    } catch {}

    const context: WebhookContext = {
      headers: request.headers,
      body,
      url: new URL(request.url),
      request: request.clone(),
    }

    for (const [name, provider] of Object.entries(providers)) {
      const isMatch = await provider.detect(context)
      if (!isMatch) continue

      const result = await provider.webhooks.handle(request)

      if (!result.ok) {
        return { ok: false, error: result.error }
      }

      return {
        ok: true,
        data: { provider: name, payload: result.data } as WebhookResult<T>,
      }
    }

    return {
      ok: false,
      error: { message: 'No matching provider found for this webhook' },
    }
  }
}

function createHandler<T extends Providers, R>(providers: T) {
  return (callback: KitHandler<T, R>) =>
    callback({
      providers,
    })
}

function createOAuthHandler<T extends Providers>(providers: T) {
  return async (provider: string | undefined, userId: string | undefined) => {
    if (!userId) {
      return new Response('No user ID specified', { status: 400 })
    }

    if (!provider) {
      return new Response('No provider specified', { status: 400 })
    }

    const providerConfig = providers[provider]

    if (!providerConfig) {
      return new Response('Invalid provider', { status: 400 })
    }

    if (!('forUser' in providerConfig)) {
      return new Response('Provider does not support OAuth', { status: 400 })
    }

    const oauthProvider = providerConfig as OAuthProvider

    const user = oauthProvider.forUser(userId)

    const result = await user.oauth.getAuthUrl()

    return Response.redirect(result.url)
  }
}

function createOAuthCallbackHandler<T extends Providers>(providers: T) {
  return async (
    provider: string | undefined,
    userId: string | undefined,
    request: Request,
    onSuccess: () => any,
  ) => {
    if (!userId) {
      return new Response('No user ID specified', { status: 400 })
    }

    if (!provider) {
      return new Response('No provider specified', { status: 400 })
    }

    const providerConfig = providers[provider]

    if (!providerConfig) {
      return new Response('Invalid provider', { status: 400 })
    }

    if (!('forUser' in providerConfig)) {
      return new Response('Provider does not support OAuth', { status: 400 })
    }

    const oauthProvider = providerConfig as OAuthProvider

    const user = oauthProvider.forUser(userId)

    const code = new URL(request.url).searchParams.get('code')
    const state = new URL(request.url).searchParams.get('state')

    if (!code || !state) {
      return new Response('Missing code or state', { status: 400 })
    }

    const result = await user.oauth.handleCallback(code, state)

    if (!result.ok) {
      return new Response('OAuth callback failed: ' + result.error.message, {
        status: 400,
      })
    }

    return onSuccess()
  }
}

export default triggers

import { error, type TKError } from './error'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface HttpClientConfig {
  baseUrl: string
  timeout?: number
  headers?: Record<string, string>
  getToken?: () => string | null | Promise<string | null>
  transformError?: (data: unknown, status: number) => TKError
}

export type HttpClient = <T = unknown>(
  path: string,
  init?: RequestInit,
) => Promise<T>

export class HttpError extends Error {
  readonly error: TKError

  constructor(err: TKError) {
    super(err.message)
    this.name = 'HttpError'
    this.error = err
  }
}

export function createHttpClient(config: HttpClientConfig): HttpClient {
  const {
    baseUrl,
    timeout = 30000,
    headers: defaultHeaders,
    getToken,
    transformError,
  } = config

  return async <T = unknown>(path: string, init?: RequestInit): Promise<T> => {
    const url = path.startsWith('http') ? path : `${baseUrl}${path}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }

    if (getToken) {
      const token = await getToken()
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    Object.assign(headers, init?.headers)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      })

      if (response.status === 204) {
        return undefined as T
      }

      const data = await response.json()

      if (!response.ok) {
        throw new HttpError(
          transformError?.(data, response.status) ??
            error(data.message ?? 'API error', undefined, 'API_ERROR'),
        )
      }

      return data as T
    } catch (e) {
      if (e instanceof HttpError) throw e
      if (e instanceof Error && e.name === 'AbortError') {
        throw new HttpError(error('Request timed out', undefined, 'TIMEOUT'))
      }
      throw new HttpError(
        error('Network request failed', undefined, 'NETWORK_ERROR'),
      )
    } finally {
      clearTimeout(timeoutId)
    }
  }
}

import type { Result, TKError } from './result'
import { err, ok } from './result'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface HttpClientConfig {
  baseUrl: string
  headers?: Record<string, string>
  getToken?: () => string | null | Promise<string | null>
  transformError?: (data: unknown, status: number) => TKError
}

export type HttpClient = <T = unknown>(
  path: string,
  init?: RequestInit,
) => Promise<Result<T>>

export function createHttpClient(config: HttpClientConfig): HttpClient {
  const { baseUrl, headers: defaultHeaders, getToken, transformError } = config

  return async <T = unknown>(
    path: string,
    init?: RequestInit,
  ): Promise<Result<T>> => {
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
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      })

      if (response.status === 204) {
        return ok(undefined as T)
      }

      const data = await response.json()

      if (!response.ok) {
        return err(
          transformError?.(data, response.status) ?? {
            message: data.message ?? 'API error',
            details: data,
          },
        )
      }

      return ok(data as T)
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        return err({ message: 'Request timed out' })
      }
      return err({ message: 'Network request failed', details: e })
    } finally {
      clearTimeout(timeoutId)
    }
  }
}

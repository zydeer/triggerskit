export type FetchOptions = RequestInit & { timeout?: number }

export async function fetchWithTimeout(
  url: string,
  init?: FetchOptions,
): Promise<Response> {
  const { timeout = 30000, ...options } = init ?? {}
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

export type RequestFn = <T = unknown>(
  path: string,
  init?: RequestInit,
) => Promise<T>

export type ActionContext<TExtra = object> = { request: RequestFn } & TExtra

export type ProviderInstance<
  TName extends string = string,
  TActions extends Record<string, (...args: never[]) => unknown> = Record<
    string,
    (...args: never[]) => unknown
  >,
> = {
  readonly provider: TName
  readonly actions: TActions
  readonly request: RequestFn
}

export type TriggersConfig = Record<string, ProviderInstance>

export type TriggersKit<TConfig extends TriggersConfig> = TConfig & {
  enableLogger: (enabled?: boolean) => void
}

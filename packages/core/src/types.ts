export type ProviderAction<TConfig = unknown, TResult = unknown> = (
  config: TConfig,
) => TResult

export type ProviderActions = Record<string, ProviderAction<never, unknown>>

export type Provider<
  TConfig,
  TActions extends ProviderActions = ProviderActions,
> = {
  config: TConfig
  actions: TActions
}

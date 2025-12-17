export type BaseProvider<TProviderName extends string = string> = {
  /** Provider identifier for filtering/grouping */
  readonly provider: TProviderName
}

export type ProviderInstance<
  TProviderName extends string = string,
  TMethods = object,
> = BaseProvider<TProviderName> & TMethods

export type TriggersConfig = Record<string, BaseProvider>

export type TriggersKit<TConfig extends TriggersConfig> = TConfig & {
  /**
   * Enable debug logging for all providers
   */
  enableLogger: (enabled?: boolean) => void
}

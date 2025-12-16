import type { Provider, ProviderActions } from '@triggerskit/core'

type TriggersConfig = {
  providers: Provider<unknown, ProviderActions>[]
}

export class Triggers {
  #config: TriggersConfig

  constructor(config: TriggersConfig) {
    this.#config = config
  }

  init(): void {
    this.#config
    // eat 5-star, do nothing
  }
}

import { createContext, useContext } from 'react'
import { configure, makeObservable, observable } from 'mobx'
import remotedev from 'mobx-remotedev'

import { PathsStore } from './Paths'

configure({ enforceActions: 'observed' })
@remotedev({ global: true })
export class RootStore {
  @observable pathsStore: PathsStore

  constructor() {
    this.pathsStore = new PathsStore(this)

    makeObservable(this)
  }
}

const rootStore = new RootStore()

export const StoreContext = createContext<RootStore>(rootStore)

export const useStore = (): RootStore => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export default rootStore
